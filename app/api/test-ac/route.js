import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    console.log("🔍 Debug ActiveCampaign connection...");

    const baseURL = process.env.ACTIVECAMPAIGN_URL;
    const apiKey = process.env.ACTIVECAMPAIGN_API_KEY;

    console.log("URL:", baseURL);
    console.log("API Key length:", apiKey?.length);
    console.log("API Key starts with:", apiKey?.substring(0, 10) + "...");

    // Test 1: URL de base sans /api/3
    const baseUrlWithoutApi = baseURL.replace("/api/3", "");
    console.log("Testing base URL:", baseUrlWithoutApi);

    // Test 2: Différentes URLs possibles
    const urlsToTest = [
      `${baseUrlWithoutApi}/api/3/users/me`,
      `${baseUrlWithoutApi}/api/3/contacts`,
      `${baseURL}/users/me`,
      `${baseURL}/contacts`,
    ];

    const results = [];

    for (const testUrl of urlsToTest) {
      try {
        console.log("Testing URL:", testUrl);

        const response = await axios.get(testUrl, {
          headers: {
            "Api-Token": apiKey,
            "Content-Type": "application/json",
          },
          timeout: 10000,
        });

        results.push({
          url: testUrl,
          status: response.status,
          success: true,
          data: response.data ? "Data received" : "No data",
        });

        console.log("✅ Success:", testUrl, response.status);
      } catch (error) {
        results.push({
          url: testUrl,
          status: error.response?.status || "No response",
          success: false,
          error: error.message,
          details: error.response?.data || "No error details",
        });

        console.log(
          "❌ Failed:",
          testUrl,
          error.response?.status,
          error.message
        );
      }
    }

    // Test spécial pour URL de connexion
    try {
      console.log("Testing account info...");

      const accountResponse = await axios.get(
        `${baseUrlWithoutApi}/api/3/users/me`,
        {
          headers: {
            "Api-Token": apiKey,
            "Content-Type": "application/json",
          },
          timeout: 15000,
        }
      );

      console.log("✅ Account info retrieved");

      return NextResponse.json({
        success: true,
        message: "ActiveCampaign connection successful",
        account: {
          user: accountResponse.data.user?.username || "Unknown",
          email: accountResponse.data.user?.email || "Unknown",
        },
        workingUrl: `${baseUrlWithoutApi}/api/3`,
        testResults: results,
      });
    } catch (error) {
      console.log("❌ Account test failed:", error.message);

      return NextResponse.json(
        {
          success: false,
          error: "All connection attempts failed",
          baseUrl: baseUrlWithoutApi,
          apiKeyLength: apiKey?.length,
          testResults: results,
          lastError: {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data,
          },
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("❌ Debug error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
        details: {
          url: process.env.ACTIVECAMPAIGN_URL,
          apiKeyExists: !!process.env.ACTIVECAMPAIGN_API_KEY,
          apiKeyLength: process.env.ACTIVECAMPAIGN_API_KEY?.length,
        },
      },
      { status: 500 }
    );
  }
}
