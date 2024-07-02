"use client";

import { useState, FormEvent, useEffect } from "react";
import { signIn, getProviders } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import "./CSS/log.css";
import Link from "next/link";

interface Credentials {
  id: string;
  password: string;
}

export default function LoginPage() {
  const [providers, setProviders] = useState(null);
  const [credentials, setCredentials] = useState<Credentials>({
    id: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    const loadProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };

    loadProviders();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      id: credentials.id,
      password: credentials.password,
    });

    if (!result.error) {
      window.location.href = "/";
    } else {
      alert("아이디와 비밀번호가 틀렸습니다.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-lg">
        <Link href="/">
          <div className="flex justify-center text-3xl text-orange-500 mb-10">
            Hi Camping
          </div>
        </Link>
        <form onSubmit={handleSubmit} className="space-y-6">
          <label
            htmlFor="id"
            className="block text-lg font-medium text-gray-700"
          >
            아이디:
          </label>
          <input
            type="text"
            id="id"
            name="id"
            value={credentials.id}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          <label
            htmlFor="password"
            className="block text-lg font-medium text-gray-700"
          >
            비밀번호:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          <button
            type="submit"
            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            로그인
          </button>
        </form>
        {providers &&
          Object.values(providers).map(
            (provider: any) =>
              provider.id !== "credentials" && (
                <div key={provider.id}>
                  <button
                    className="my-2 w-full flex items-center justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    onClick={() =>
                      signIn(provider.id, { redirect: true, callbackUrl: "/" })
                    }
                  >
                    <FontAwesomeIcon icon={faGithub} className="w-5 h-5" />
                  </button>
                </div>
              )
          )}
        <div className="flex justify-end py-2.5 px-4 border border-transparent text-sm font-medium  hover:text-blue-700 duration-500 cursor-pointer">
          <Link href="/register">회원가입</Link>
        </div>
      </div>
    </div>
  );
}
