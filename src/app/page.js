import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "@/components/Topbar";
import WorkersList from "@/components/WorkersList";
// import Login from "@/components/login";
import Register from "@/components/register";
import Link from "next/link"; 

export default function Home() {
  return (
    <>
      <Navbar />
     
      <WorkersList /> <Register/>
    </>
  );
}
