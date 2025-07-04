import { FaDiscord, FaTwitter, FaYoutube, FaMedium } from "react-icons/fa";

const socialLinks = [
  { href: "https://discord.com", icon: <FaDiscord /> },
  { href: "https://twitter.com", icon: <FaTwitter /> },
  { href: "https://youtube.com", icon: <FaYoutube /> },
  { href: "https://medium.com", icon: <FaMedium /> },
];

const Footer = () => (
  <footer className="w-screen bg-[#5542ff] py-4 text-black">
    <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
      <p>©Nova 2024. All rights reserved</p>

      <div className="flex justify-center gap-4 md:justify-start">
        {socialLinks.map(({ href, icon }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noreferrer noopener"
            className="text-black transition-colors duration-500 ease-in-out hover:text-white"
          >
            {icon}
          </a>
        ))}
      </div>

      <a
        href="#privacy-policy"
        className="text-center text-sm font-light hover:underline md:text-right"
      >
        Privacy Policy
      </a>
    </div>
  </footer>
);

export default Footer;
