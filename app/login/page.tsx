import Image from "next/image";
import { SignInButton, SignedOut } from "@clerk/nextjs";
import { Button } from "../_components/ui/button";
import { LogInIcon } from "lucide-react";
const LoginPage = async () => {
  return (
    <div className="grid h-full grid-cols-2">
      <div className="mx-auto flex h-full max-w-[550px] flex-col justify-center p-8">
        <Image
          src="/logo.svg"
          alt="finance.ai"
          width={173}
          height={39}
          className="mb-8"
        />
        <h1 className="mb-3 text-4xl font-bold text-white">Bem-vindo</h1>
        <p className="mb-8 text-muted-foreground">
          A Finance AI é uma plataforma de gestão financeira que utiliza IA para
          monitorar suas movimentações, e oferecer insights personalizados,
          facilitando o controle do seu orçamento.
        </p>
        <SignedOut>
          <SignInButton>
            <Button variant={"outline"}>
              <LogInIcon className="mr-2" />
              Fazer login ou criar conta
            </Button>
          </SignInButton>
        </SignedOut>

        {/* 1:03:17 - AULA 2 */}
      </div>

      <div className="relative h-full w-full">
        <Image
          src="/login.png"
          alt="Faça login"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default LoginPage;
