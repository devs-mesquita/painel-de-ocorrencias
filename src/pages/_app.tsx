import { type AppType } from "next/app";
import { api } from "@/utils/api";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className="font- flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 flex-col bg-white bg-gradient-to-br">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
};

export default api.withTRPC(MyApp);
