let imported = 0;
let skipped = 0;
let errors: any[] = [];

for (const lead of leads) {

  const phone = (lead.phone_number || "")
    .replace(/^p:/i, "")
    .trim();

  const email = (lead.email || "")
    .trim()
    .toLowerCase();

  if (!phone && !email) {
    skipped++;
    continue;
  }

  let exists = false;

  if (phone) {
    const { data, error } = await supabase
      .from("leads")
      .select("id")
      .eq("phone", phone)
      .limit(1);

    if (error) {
      console.log(error);
    }

    exists = !!data?.length;
  }

  if (!exists && email) {
    const { data, error } = await supabase
      .from("leads")
      .select("id")
      .eq("email", email)
      .limit(1);

    if (error) {
      console.log(error);
    }

    exists = !!data?.length;
  }

  if (exists) {
    skipped++;
    continue;
  }

  const { error } = await supabase
    .from("leads")
    .insert({
      client_name: lead.full_name || "Lead Facebook",
      phone,
      email,
      status: "nou",
      source: lead.campaign_name || "Facebook Ads",
      created_at: lead.created_time
        ? new Date(lead.created_time).toISOString()
        : new Date().toISOString()
    });

  if (error) {
    console.log("INSERT ERROR:", error);
    errors.push(error.message);
    continue;
  }

  imported++;
}

return NextResponse.json({
  success: true,
  total: leads.length,
  imported,
  skipped,
  errors
});
