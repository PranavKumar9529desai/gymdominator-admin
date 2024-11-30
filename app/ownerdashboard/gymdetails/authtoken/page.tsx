"use client";
import { auth } from "@/auth";
import { sessionType } from "@/app/actions/gym/FetchGymDetailsSA";
import CreateTokenButton from "./createTokenButton";
import { useSession } from "next-auth/react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import axios from "axios";

async function getExistingToken(session: sessionType) {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/owner/getauthtoken`, {
    headers: {
      Authorization: ` ${JSON.stringify(session)}`
    }
  });
  return response.data.token;
}

export default async function AuthTokenPage() {
  const { data: session } = await useSession();
  
  if (!session) {
    return <>Loading please wait</>;
  }

  const existingToken = await getExistingToken(session as sessionType);

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Authentication Token</CardTitle>
        </CardHeader>
        <CardContent>
          {existingToken ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle2 className="w-5 h-5" />
                <span>Active Token</span>
              </div>
              <div className="p-4 bg-gray-50 rounded-md font-mono">
                {existingToken}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-600">
                No active token found. Generate a new authentication token for your gym.
              </p>
              <CreateTokenButton 
                session={session as sessionType}
                onTokenCreated={(token) => {
                  // This will trigger a server refresh
                  window.location.reload();
                }}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
