import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "@/components/Topbar";
import WorkersList from "@/components/WorkersList";

export default function Home() {
  return (
    <>
      <Navbar />
      <WorkersList />
    </>
  );
}
