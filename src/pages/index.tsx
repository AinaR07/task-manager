import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import useTaskManager from "./hooks/useTaskManager";



/**
 * Calculates the time difference between the server time and client time.
 * @param {Date} serverTime - The server time.
 * @param {Date} clientTime - The client time.
 * @returns {string} The time difference in the format "{days} days, {hours} hours, {minutes} minutes, {seconds} seconds".
 */
const calculateTimeDifference = (serverTime: Date, clientTime: Date): string => {
  const diff = Math.abs(serverTime.getTime() - clientTime.getTime()) / 1000;
  const days = Math.floor(diff / 86400);
  const hours = Math.floor((diff % 86400) / 3600);
  const minutes = Math.floor((diff % 3600) / 60);
  const seconds = Math.floor(diff % 60);

  return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
};

export default function Home() {
  const router = useRouter();
  const [serverTime, setServerTime] = useState<Date>(new Date());
  const [timeDifference, setTimeDifference] = useState<string>("");

  useEffect(() => {
    // Fetch the server time
    const fetchServerTime = async () => {
      try {
        const response = await fetch("/api/time");
        const data = await response.json();
        const serverTime = new Date(data.serverTime);
        setServerTime(serverTime);

        const clientTime = new Date();
        const difference = calculateTimeDifference(serverTime, clientTime);
        setTimeDifference(difference);
      } catch (error) {
        console.error("Error fetching server time:", error);
      }
    };

    fetchServerTime();
  }, []);

  const moveToTaskManager = () => {
    router.push("/tasks");
  };

  return (
    <>
      <Head>
        <title>Web 2 - Exam TD</title>
        <meta name="description" content="Just an exam" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>The easiest exam you will ever find</h1>
        <div>
          <p>
            Server time:{" "}
            <span className="serverTime">
              {serverTime.toLocaleString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
              })}
            </span>
          </p>

          <p>
            Time diff:{" "}
            <span className="serverTime">{timeDifference}</span>
          </p>
        </div>

        <div>
          <button onClick={moveToTaskManager}>Go to task manager</button>
        </div>
      </main>
    </>
  );
}
