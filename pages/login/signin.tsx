import { signIn, useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default function Signin({ onClose }) {
  const { data: session } = useSession();
  const router = useRouter();
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    const id = (event.target as any).id.value;
    const password = (event.target as any).password.value;

    const result = await signIn("credentials", {
      redirect: false,
      id,
      password,
    });

    if (!result.error) {
      onClose();
      router.push("/");
    } else {
      alert("Login failed");
    }
  };

  const handleGithubLogin = () => {
    signIn("github");
  };

  useEffect(() => {
    if (session) {
      router.refresh();
    }
  }, [session, router]);

  return (
    <form onSubmit={handleLogin} className="p-4">
      <div className="mb-4">
        <label htmlFor="id" className="block text-sm font-bold mb-2">
          ID
        </label>
        <input
          type="text"
          id="id"
          name="id"
          required
          className="border rounded w-full py-2 px-3"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-bold mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          className="border rounded w-full py-2 px-3"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600"
      >
        로그인
      </button>
      <div className="mt-4">
        <button
          type="button"
          className="bg-gray-800 w-full text-white py-2 px-4 rounded hover:bg-gray-900"
          onClick={handleGithubLogin}
        >
          <FontAwesomeIcon icon={faGithub} className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}
