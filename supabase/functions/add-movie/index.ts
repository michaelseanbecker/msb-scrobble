// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"

console.log("Add new movie view!")

Deno.serve(async (req) => {
  console.log("Request received");
  // Parse the multipart form data
  
  const reqBody = await req.formData();
  for (const pair of reqBody.entries()) {
    const field = pair[0], val = pair[1];
    console.log("FIELD =>", field);
    if (val instanceof File) {
      console.log("FILE =>", field, val);
    } else {
      const data = JSON.parse(val);
      console.log("DATA =>", data.event);
    }
  }
  return new Response(null, { status: 201 });
  // Process the form data
  // console.log("Plex Webhook Event:", formData);
  // return new Response(
  //   JSON.stringify(data),
  //   { headers: { "Content-Type": "application/json" } },
  // )
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/add-movie' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
