import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../../UserContext";

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { userInfo } = useContext(userContext);

  const email = userInfo?.email;
  const id = userInfo?.id;

  return (
    <div>
      <nav>
        <section>
          <div
            id="menu-btn"
            className={
              isNavOpen ? "open hamburger md:hidden" : "hamburger md:hidden"
            }
            onClick={() => setIsNavOpen((prev) => !prev)}
          >
            <span className="hamburger-top"></span>
            <span className="hamburger-middle"></span>
            <span className="hamburger-bottom"></span>
          </div>

          <div
            className={
              isNavOpen ? "showMenuNav z-50 dark:bg-dark-100 " : "hideMenuNav"
            }
          >
            <div className="flex flex-col gap-4 bg-white text-xl dark:bg-dark-100 dark:text-white [&>*]:cursor-pointer">
              <li
                onClick={() => setIsNavOpen((prev) => !prev)}
                className=" hover:text-pink font-bold"
              >
                Service
              </li>

              <li
                onClick={() => setIsNavOpen((prev) => !prev)}
                className=" hover:text-pink"
              >
                Featured Work
              </li>

              <li
                onClick={() => setIsNavOpen((prev) => !prev)}
                className=" hover:text-pink"
              >
                Pricing
              </li>

              <li
                onClick={() => setIsNavOpen((prev) => !prev)}
                className=" hover:text-pink"
              >
                About Us
              </li>

              <li
                onClick={() => setIsNavOpen((prev) => !prev)}
                className=" hover:text-pink"
              >
                Contact Us
              </li>
              {email && (
                <>
                  <Link to={`/users/${id}`}>
                    <li onClick={() => setIsNavOpen((prev) => !prev)}>
                      Profile
                    </li>
                  </Link>
                </>
              )}

              {!email && (
                <>
                  <Link to="/login">
                  <li onClick={() => setIsNavOpen((prev) => !prev)}>
                      Login
                    </li>
                  </Link>
                </>
              )}
            </div>
          </div>
        </section>
      </nav>
      <style>{`
      .hideMenuNav {
        display: none;
      }
     
    `}</style>
    </div>
  );
}
