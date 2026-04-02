"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import AdminLayout from "@modules/dashboard/layout/AdminLayout";
import Cards from "@modules/dashboard/components/widgets/Cards";
import QuickLinks from "@modules/dashboard/components/widgets/QuickLinks";
import { fetchTotalUsers } from "@/actions/users/totalusers";
import { fetchLabs } from "@/actions/labs/getlabs";
import { fetchHospitals } from "@/actions/hospitals/gethospitals";
import { fetchPharmacies } from "@/actions/pharmacies/getpharmacies";
import usersIcon from "@/public/usersIcon.svg";
import person from "@/public/person.svg";
import stethoscope from "@/public/stethoscope.svg";
import home_health from "@/public/home_health.svg";
import medication from "@/public/medication.svg";
import chart_data from "@/public/chart_data.svg";

const quickLinks = [
  { title: "Accounts management", href: "/dashboard/account" },
  { title: "Patients on queue", href: "/dashboard/patients/queue" },
  { title: "Cancelled appointments", href: "/dashboard/appointments/cancelled" },
  { title: "User reports", href: "/dashboard/reports" },
  { title: "Support center", href: "/support" },
];

export default function Home() {
  const [totalUsers, setTotalUsers] = useState<number | null>(null);
  const [patientsCount, setPatientsCount] = useState<number | null>(null);
  const [doctorsCount, setDoctorsCount] = useState<number | null>(null);
  const [labsCount, setLabsCount] = useState<number | null>(null);
  const [hospitalsCount, setHospitalsCount] = useState<number | null>(null);
  const [pharmaciesCount, setPharmaciesCount] = useState<number | null>(null);

  useEffect(() => {
    fetchTotalUsers()
      .then((response) => {
        const users = response.data;
        setTotalUsers(users.length);
        setPatientsCount(users.filter((u) => u.userType === "PATIENT").length);
        setDoctorsCount(users.filter((u) => u.userType === "DOCTOR").length);
      })
      .catch(() => {
        setTotalUsers(0);
        setPatientsCount(0);
        setDoctorsCount(0);
      });

    fetchLabs()
      .then((response) => setLabsCount(response.data.length))
      .catch(() => setLabsCount(0));

    fetchHospitals()
      .then((response) => setHospitalsCount(response.data.length))
      .catch(() => setHospitalsCount(0));

    fetchPharmacies()
      .then((response) => setPharmaciesCount(response.data.length))
      .catch(() => setPharmaciesCount(0));
  }, []);

  const cardsData = [
    {
      title: "Total users",
      description: totalUsers !== null ? String(totalUsers) : "…",
      image: usersIcon,
      backgroundColor: "#EBE3E0",
      iconBackgroundColor: "#C2C9D6",
      href: "/dashboard/totalusers",
    },
    {
      title: "Patients",
      description: patientsCount !== null ? String(patientsCount) : "…",
      image: person,
      backgroundColor: "#F0F1F5",
      iconBackgroundColor: "#C2C9D6",
      href: "/dashboard/patients",
    },
    {
      title: "Doctors",
      description: doctorsCount !== null ? String(doctorsCount) : "…",
      image: stethoscope,
      backgroundColor: "#F0F4F5",
      iconBackgroundColor: "#C2C9D6",
      href: "/dashboard/doctor",
    },
    {
      title: "Pharmacies",
      description: pharmaciesCount !== null ? String(pharmaciesCount) : "\u2026",
      image: medication,
      backgroundColor: "#E6E6E6",
      iconBackgroundColor: "#C2C9D6",
      href: "/dashboard/pharmacy",
    },
    {
      title: "Labs",
      description: labsCount !== null ? String(labsCount) : "…",
      image: home_health,
      backgroundColor: "#F0F1F5",
      iconBackgroundColor: "#C2C9D6",
      href: "/dashboard/labs",
    },
    {
      title: "Hospitals",
      description: hospitalsCount !== null ? String(hospitalsCount) : "\u2026",
      image: home_health,
      backgroundColor: "#F0F1F5",
      iconBackgroundColor: "#C2C9D6",
      href: "/dashboard/hospital",
    },
    {
      title: "Graph",
      description: "",
      image: chart_data,
      backgroundColor: "#F0F5F3",
      iconBackgroundColor: "#C2C9D6",
      className: "min-h-[130px]",
      href: "/dashboard/reports",
    },
  ];

  return (
    <AdminLayout>
      <section className="mx-auto w-full max-w-5xl space-y-10 ">
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cardsData.map(({ href, ...card }) => (
            <Link
              key={card.title}
              href={href}
              className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
            >
              <Cards {...card} />
            </Link>
          ))}
        </div>

        <QuickLinks items={quickLinks} />
      </section>
    </AdminLayout>
  );
}
