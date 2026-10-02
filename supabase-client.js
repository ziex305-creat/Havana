(function () {
    const supabaseUrl = "https://mflupkhfbaxhgpausclv.supabase.co";
    const supabasePublishableKey = "sb_publishable_MlfdBUqKpDPWRAaPFdkJQQ_eQvIX0hx";

    if (!window.supabase?.createClient) {
        console.error("Supabase SDK did not load.");
        return;
    }

    window.supabaseClient = window.supabase.createClient(supabaseUrl, supabasePublishableKey);
})();