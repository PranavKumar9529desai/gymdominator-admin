"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { KeyRound, Copy, RefreshCw, Trash2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Toaster, toast as sonnerToast } from 'sonner';
import { Card, CardContent } from "@/components/ui/card";

interface Token {
  id: string;
  token: string;
  createdAt: string;
  lastUsed: string;
}

const MAX_TOKENS = 3;

export default function AuthToken() {
  const [generatedToken, setGeneratedToken] = useState("");
  const [activeTokens, setActiveTokens] = useState<Token[]>([
    {
      id: "1",
      token: "gym-abc123xyz",
      createdAt: "2024-03-20",
      lastUsed: "2024-03-21",
    },
  ]);
  const { toast } = useToast();

  const handleGenerateToken = () => {
    if (activeTokens.length >= MAX_TOKENS) {
      sonnerToast.error('Token Limit Exceeded', {
        description: 'You cannot create more than 3 active tokens. Please revoke an existing token first.',
        action: {
          label: 'Dismiss',
          onClick: () => console.log('Dismissed')
        },
        style: {
          background: '#fee2e2',
          border: '1px solid #fecaca',
          borderLeft: '4px solid #ef4444',
        },
      });
      return;
    }

    const newToken = `gym-${Math.random().toString(36).substr(2, 9)}`;
    setGeneratedToken(newToken);
    
    const newTokenObj: Token = {
      id: Date.now().toString(),
      token: newToken,
      createdAt: new Date().toISOString().split('T')[0],
      lastUsed: '-',
    };
    setActiveTokens([...activeTokens, newTokenObj]);
    
    toast({
      title: "Token Generated",
      description: "New authentication token has been created.",
    });
  };

  const handleCopyToken = async (tokenToCopy: string) => {
    try {
      await navigator.clipboard.writeText(tokenToCopy);
      sonnerToast.success('Copied to Clipboard', {
        description: 'Token has been copied successfully',
        duration: 2000,
        position: 'bottom-center',
        style: {
          background: '#dcfce7',
          border: '1px solid #bbf7d0',
          color: '#166534',
        },
      });
    } catch (err) {
      sonnerToast.error('Failed to Copy', {
        description: 'Please try copying manually',
        duration: 3000,
        position: 'bottom-center',
        style: {
          background: '#fee2e2',
          border: '1px solid #fecaca',
          color: '#991b1b',
        },
      });
    }
  };

  const handleDeleteToken = (id: string) => {
    setActiveTokens(activeTokens.filter(token => token.id !== id));
    toast({
      title: "Token Deleted",
      description: "The authentication token has been revoked.",
    });
  };

  return (
    <div className="flex flex-col space-y-6 p-4 sm:p-6 max-w-5xl mx-auto">
      <Toaster 
        position="top-center"
        expand={true}
        richColors
      />
      
      {/* Header Section */}
      <div className="space-y-4 ">
        <div className="flex items-center gap-3 justify-center mb-2">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <KeyRound className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold">Auth Tokens</h1>
        </div>

        <Alert className="text-sm ">
          <AlertCircle className="h-4 w-4 " />
          <AlertDescription className="line-clamp-2 sm:line-clamp-1">
            Share these tokens with trainers during registration. Maximum {MAX_TOKENS} active tokens allowed.
          </AlertDescription>
        </Alert>
      </div>

      {/* Active Tokens Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Active Tokens</h2>
          <span className="text-sm text-muted-foreground">
            {activeTokens.length}/{MAX_TOKENS} tokens
          </span>
        </div>
        
        {/* Desktop Table View */}
        <div className="hidden sm:block border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Token</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last Used</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeTokens.map((token) => (
                <TableRow key={token.id}>
                  <TableCell className="font-mono font-medium">{token.token}</TableCell>
                  <TableCell>{token.createdAt}</TableCell>
                  <TableCell>{token.lastUsed}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopyToken(token.token)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteToken(token.id)}
                        className="hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Card View */}
        <div className="sm:hidden space-y-3">
          {activeTokens.map((token) => (
            <Card key={token.id}>
              <CardContent className="p-4 space-y-3">
                <div className="flex flex-col space-y-3">
                  <div className="text-sm font-medium text-muted-foreground">
                    Token ID
                  </div>
                  <div className="font-mono text-sm font-medium break-all p-3 bg-muted rounded-md">
                    {token.token}
                  </div>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Created:</span> 
                      {token.createdAt}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Last used:</span> 
                      {token.lastUsed}
                    </div>
                  </div>
                  
                  {/* Action Buttons moved below */}
                  <div className="pt-2 grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      onClick={() => handleCopyToken(token.token)}
                      className="h-11 flex items-center justify-center gap-2"
                    >
                      <Copy className="h-5 w-5" />
                      Copy Token
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleDeleteToken(token.id)}
                      className="h-11 flex items-center justify-center gap-2 text-destructive hover:text-destructive-foreground hover:bg-destructive"
                    >
                      <Trash2 className="h-5 w-5" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Generate New Token Section */}
      <div className="space-y-3 pt-4 border-t">
        <h2 className="text-lg font-semibold">Generate New Token</h2>
        <div className="flex flex-col gap-3">
          <Input
            value={generatedToken}
            readOnly
            placeholder="Click generate to create a new token"
            className="font-mono text-sm"
          />
          {generatedToken && (
            <Button
              variant="outline"
              onClick={() => handleCopyToken(generatedToken)}
              className="h-10 flex items-center gap-2 justify-center"
            >
              <Copy className="h-5 w-5" />
              Copy to Clipboard
            </Button>
          )}
          <Button 
            onClick={handleGenerateToken} 
            className="w-full h-12"
            size="lg"
            disabled={activeTokens.length >= MAX_TOKENS}
          >
            <RefreshCw className="mr-2 h-5 w-5" />
            Generate New Token
          </Button>
        </div>
      </div>
    </div>
  );
}