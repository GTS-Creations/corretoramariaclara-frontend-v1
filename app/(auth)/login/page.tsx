"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Eye, EyeOff, Lock, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { loginSchema } from "@/schemas/auth.schema";
import { LoginAdminService } from "@/services/auth.service";

type FormValues = z.infer<typeof loginSchema>;

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const loginMutation = useMutation({
    mutationFn: async (data: FormValues) => {
      return await LoginAdminService(data);
    },

    onSuccess: () => {
      router.push("/admin/catalogo");
    },
  });

  const onSubmit = async (data: FormValues) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-6 h-6 text-white" />
          </div>

          <CardTitle className="mx-auto mb-8">
            <Link href="/">
              <Image src={"/logo.png"} height={200} alt="logo" width={200} />
            </Link>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* EMAIL */}
            <div className="space-y-2">
              <div className="relative">
                <User className="absolute left-3 top-2 h-4 w-4 text-gray-400" />

                <Input
                  type="email"
                  placeholder="Digite seu e-mail"
                  className="pl-10"
                  {...register("ADMIN_EMAIL")}
                />
              </div>

              {errors.ADMIN_EMAIL && (
                <p className="text-sm text-red-500">
                  {errors.ADMIN_EMAIL.message}
                </p>
              )}
            </div>

            {/* PASSWORD */}
            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-3 top-2 h-4 w-4 text-gray-400" />

                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua senha"
                  className="pl-10 pr-10"
                  {...register("ADMIN_PASSWORD")}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 cursor-pointer" />
                  ) : (
                    <Eye className="h-4 w-4 cursor-pointer" />
                  )}
                </button>
              </div>

              {errors.ADMIN_PASSWORD && (
                <p className="text-sm text-red-500">
                  {errors.ADMIN_PASSWORD.message}
                </p>
              )}
            </div>

            {/* ERRO LOGIN */}
            {loginMutation.isError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />

                <AlertTitle>Erro</AlertTitle>

                <AlertDescription>
                  Erro ao fazer login. Verifique suas credenciais.
                </AlertDescription>
              </Alert>
            )}

            {/* BOTÃO */}
            <Button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 cursor-pointer font-cinzel"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
