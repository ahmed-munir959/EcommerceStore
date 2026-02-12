import {
  Send,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Copyright,
} from "lucide-react";
import "../../styles/scss/_Footer.scss";

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  return (
    <footer className={`bg-app-black text-app-white w-full   ${className}`}>
      {/* ================= Main Footer ================= */}
      <div className="max-w-[73.125rem] mx-auto px-4 md:px-8 pt-12 md:pt-16 lg:pt-20 pb-8 md:pb-12 lg:pb-14 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8 lg:gap-14">

          {/* -------- Exclusive -------- */}
          <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 items-center sm:items-start text-center sm:text-left mobile-hidden">
            <h2 className="font-inter font-bold text-xl md:text-2xl tracking-[0.03em] text-app-white leading-6">
              Exclusive
            </h2>

            <h3 className="font-poppins font-medium text-lg md:text-xl text-app-white leading-7">
              Subscribe
            </h3>

            <p className="font-poppins font-normal text-base md:text-lg-token text-app-white">
              Get 10% off your first order
            </p>

            <div className="w-full max-w-[18rem] h-12 relative">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full h-full bg-transparent border-[0.09375rem] border-app-white rounded px-4 py-3 pr-12 font-poppins text-sm md:text-base-token text-app-white placeholder-gray-400 outline-none"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2">
                <Send className="w-5 h-5 md:w-6 md:h-6 text-app-white" />
              </button>
            </div>
          </div>

          {/* -------- Support -------- */}
          <div className="flex flex-col gap-4 md:gap-6 items-center sm:items-start text-center sm:text-left heading-only-mobile">
            <h3 className="font-poppins font-medium text-lg md:text-xl text-app-white leading-7">
              Support
            </h3>

            <div className="flex flex-col gap-3 md:gap-4">
              <p>111 Bijoy sarani, Dhaka, Bangladesh</p>
              <p>exclusive@gmail.com</p>
              <p>+88015-88888-9999</p>
            </div>
          </div>

          {/* -------- Account -------- */}
          <div className="flex flex-col gap-4 md:gap-6 items-center sm:items-start text-center sm:text-left heading-only-mobile">
            <h3 className="font-poppins font-medium text-lg md:text-xl text-app-white leading-7">
              Account
            </h3>

            <div className="flex flex-col gap-3 md:gap-4">
              {["My Account", "Login / Register", "Cart", "Wishlist", "Shop"].map(
                (item) => (
                  <a key={item} href="#" className="font-poppins text-sm md:text-lg-token">
                    {item}
                  </a>
                )
              )}
            </div>
          </div>

          {/* -------- Quick Link -------- */}
          <div className="flex flex-col gap-4 md:gap-6 items-center sm:items-start text-center sm:text-left heading-only-mobile">
            <h3 className="font-poppins font-medium text-lg md:text-xl text-app-white leading-7">
              Quick Link
            </h3>

            <div className="flex flex-col gap-3 md:gap-4">
              {["Privacy Policy", "Terms Of Use", "FAQ", "Contact"].map(
                (item) => (
                  <a key={item} href="#" className="font-poppins text-sm md:text-lg-token">
                    {item}
                  </a>
                )
              )}
            </div>
          </div>

          {/* -------- Download App -------- */}
          <div className="flex flex-col gap-4 md:gap-6 items-center sm:items-start text-center sm:text-left heading-only-mobile">
            <h3 className="font-poppins font-medium text-lg md:text-xl text-app-white leading-7">
              Download App
            </h3>

            <div className="flex flex-col gap-2">
              <p className="font-poppins font-medium text-xs-token text-app-white">
                Save $3 with App New User Only
              </p>

              <div className="flex gap-2 items-center justify-center sm:justify-start">
                <img
                  src="/src/assets/icons/991387c05dd6d44594e01b675513068803e2426d.jpg"
                  alt="QR Code"
                  className="hidden sm:block w-16 h-16 md:w-20 md:h-20"
                />

                <div className="flex flex-col gap-1">
                  <img
                    src="/src/assets/icons/a61d4c7110b18ab55a1e1a07ebf54a46ebb07284.png"
                    alt="Google Play"
                    className="w-24 h-8 md:w-[6.5rem] md:h-[2.125rem] rounded border border-white"
                  />
                  <img
                    src="/src/assets/icons/38932d5accb54c528f9bcf326ca48ea29bd6d890.png"
                    alt="App Store"
                    className="w-24 h-8 md:w-[6.5rem] md:h-[2.125rem] rounded border border-white"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4 md:gap-6 justify-center sm:justify-start">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#">
                  <Icon className="w-5 h-5 md:w-6 md:h-6 text-app-white" />
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ================= Copyright ================= */}
      <div className="border-t border-gray-800">
        <div className="max-w-[73.125rem] mx-auto px-4 md:px-8 py-3 md:py-4">
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <Copyright className="w-3 h-3 md:w-4 md:h-4" />
            <p className="font-poppins text-xs md:text-base-token">
              Copyright Rimel 2022. All right reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
