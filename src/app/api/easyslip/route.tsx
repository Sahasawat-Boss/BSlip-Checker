import { NextRequest } from "next/server";

export async function GET() {
    // Simple GET request for testing
    return Response.json({ message: 'API Test successful!' });
}

//** POST -----------------------------------------------------------------------------
export async function POST(request: NextRequest) {
    // Extract form data from the incoming request
    const formData = await request.formData();

    // Get the Bearer token from the environment variables
    const apiKey = process.env.EASYSIP_API_KEY;

    if (!apiKey) {
        return new Response('API key is missing', { status: 500 });
    }

    // Send the form data as a POST request to an external API
    const res = await fetch('https://developer.easyslip.com/api/v1/verify', {
        method: 'POST',
        headers: {
            // Set the Authorization header with the Bearer token
            'Authorization': `Bearer ${apiKey}`,
        },
        body: formData,
    });

    // Parse the JSON response from the external API
    const data = await res.json();

    // Return the response as a JSON object
    return Response.json({ data });
}

//http://localhost:3000/api/easyslip