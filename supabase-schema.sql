create table if not exists public.store_orders (
    id uuid primary key default gen_random_uuid(),
    order_no bigint generated always as identity unique,
    user_id uuid references auth.users (id) on delete set null,
    customer_name text not null check (char_length(customer_name) between 1 and 120),
    customer_phone text not null check (char_length(customer_phone) between 3 and 40),
    customer_address text not null check (char_length(customer_address) between 1 and 500),
    subtotal numeric(12, 2) not null check (subtotal >= 0),
    discount_percent numeric(5, 2) not null default 0 check (discount_percent between 0 and 50),
    discount_amount numeric(12, 2) not null check (discount_amount >= 0),
    total_amount numeric(12, 2) not null check (total_amount >= 0),
    status text not null default 'pending' check (status in ('pending', 'confirmed', 'shipped', 'cancelled')),
    created_at timestamptz not null default now()
);

create table if not exists public.store_order_items (
    id bigint generated always as identity primary key,
    order_id uuid not null references public.store_orders (id) on delete cascade,
    product_name text not null check (char_length(product_name) between 1 and 160),
    unit_price numeric(12, 2) not null check (unit_price > 0),
    quantity integer not null check (quantity between 1 and 99),
    image_url text not null default '' check (char_length(image_url) <= 2048)
);

create index if not exists store_orders_created_at_idx on public.store_orders (created_at desc);
create index if not exists store_orders_user_id_idx on public.store_orders (user_id);
create index if not exists store_order_items_order_id_idx on public.store_order_items (order_id);

alter table public.store_orders enable row level security;
alter table public.store_order_items enable row level security;

revoke all on public.store_orders, public.store_order_items from anon, authenticated;

create or replace function public.create_store_order(
    p_customer_name text,
    p_customer_phone text,
    p_customer_address text,
    p_items jsonb,
    p_discount_percent numeric default 0
)
returns table (
    order_no bigint,
    subtotal numeric,
    discount_amount numeric,
    total_amount numeric
)
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
    v_order_id uuid;
    v_order_no bigint;
    v_subtotal numeric(12, 2) := 0;
    v_discount_amount numeric(12, 2);
    v_discount_percent numeric(5, 2) := coalesce(p_discount_percent, 0);
    v_total numeric(12, 2);
    v_item jsonb;
    v_name text;
    v_price numeric(12, 2);
    v_quantity integer;
    v_image text;
begin
    if char_length(btrim(coalesce(p_customer_name, ''))) not between 1 and 120
        or char_length(btrim(coalesce(p_customer_phone, ''))) not between 3 and 40
        or char_length(btrim(coalesce(p_customer_address, ''))) not between 1 and 500 then
        raise exception 'Customer details are invalid';
    end if;

    if p_items is null or jsonb_typeof(p_items) <> 'array' then
        raise exception 'Order items are invalid';
    end if;

    if jsonb_array_length(p_items) not between 1 and 100 then
        raise exception 'Order items are invalid';
    end if;

    if v_discount_percent < 0 or v_discount_percent > 50 then
        raise exception 'Discount is invalid';
    end if;

    for v_item in select value from jsonb_array_elements(p_items)
    loop
        v_name := btrim(coalesce(v_item ->> 'name', ''));
        v_price := (v_item ->> 'price')::numeric;
        v_quantity := (v_item ->> 'qty')::integer;

        if char_length(v_name) not between 1 and 160
            or v_price is null or v_price <= 0 or v_price > 10000000
            or v_quantity is null or v_quantity not between 1 and 99 then
            raise exception 'An order item is invalid';
        end if;

        v_subtotal := v_subtotal + (v_price * v_quantity);
    end loop;

    v_discount_amount := round(v_subtotal * v_discount_percent / 100, 2);
    v_total := v_subtotal - v_discount_amount;

    insert into public.store_orders (
        user_id, customer_name, customer_phone, customer_address,
        subtotal, discount_percent, discount_amount, total_amount
    ) values (
        auth.uid(), btrim(p_customer_name), btrim(p_customer_phone), btrim(p_customer_address),
        v_subtotal, v_discount_percent, v_discount_amount, v_total
    ) returning id, store_orders.order_no into v_order_id, v_order_no;

    for v_item in select value from jsonb_array_elements(p_items)
    loop
        v_name := btrim(v_item ->> 'name');
        v_price := (v_item ->> 'price')::numeric;
        v_quantity := (v_item ->> 'qty')::integer;
        v_image := left(coalesce(v_item ->> 'image', ''), 2048);

        insert into public.store_order_items (order_id, product_name, unit_price, quantity, image_url)
        values (v_order_id, v_name, v_price, v_quantity, v_image);
    end loop;

    return query select v_order_no, v_subtotal, v_discount_amount, v_total;
end;
$$;

revoke all on function public.create_store_order(text, text, text, jsonb, numeric) from public;
grant execute on function public.create_store_order(text, text, text, jsonb, numeric) to anon, authenticated;