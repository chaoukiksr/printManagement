import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="home-page container mx-auto px-[30px]">
      <div className="slogan text-center mt-[60px] max-w-[850px] mx-auto">
        <p>Are You Ready To Create your print managment system?</p>
        <h1 className="lg:text-[60px] text-[40px] my-2 font-bold">
          <span className="text-(--gray)">
            A Random Title To just Test The So
          </span>{" "}
          This is Just A Text so
        </h1>
        <p className="text-(--gray) max-w-[650px] mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation{" "}
        </p>

        <div className="cta flex mt-[80px] gap-3 items-center justify-center flex-wrap">
          <button className="btn grow sm:grow-0">
            <Link href={"/register"}>Sign Up For new Adiministration</Link>
          </button>
          <button className="btn-outline grow sm:grow-0">
            <Link href={"/login"}>Log In</Link>
          </button>
        </div>
      </div>

      <picture
        className="w-full mt-[50px] block"
        style={{
          filter: "drop-shadow(0 0 20px var(--primary))",
        }}
      >
        <source
          srcSet="/assets/dashboard-img.png"
          media="(min-width: 1024px)"
        />
        <source
          srcSet="/assets/dashboard-mobile.png"
          media="(max-width: 680px)"
        />

        <img src="/assets/dashboard-img.png" alt="" className="w-full" />
      </picture>
      {/* <img
        src="/assets/dashboard-img.png"
        alt=""
        className="w-full mt-[50px] "
        style={{
          filter: "drop-shadow(0 0 20px var(--primary))",
        }}
      /> */}
    </div>
  );
}
