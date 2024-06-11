import IconButton from "@components/common/IconButton";
import useAuth from "@store/useAuth";
import { SplitWords } from "@utils/textFormatter";
import { Avatar, Button, Divider, Popover, Typography } from "antd";
import { useMemo } from "react";
import { RxAvatar, RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";

const Account = () => {
  const { logoutUser } = useAuth();

  return (
    <>
      <Divider />
      <div className="w-[300px]">
        <Button onClick={logoutUser} type="default" block>
          Logout
        </Button>
      </div>
    </>
  );
};

const NavLink = ({ text, to }) => (
  <Link
    to={to}
    className="font-bold text-white px-3 py-2 bg-[#1A73E2] hover:bg-[#3688EE] rounded-[4px] transition-all duration-500"
  >
    {text}
  </Link>
);

const PublicNav = () => {
  return (
    <div className="flex gap-3 items-center">
      <NavLink to="/auth/login" text="Login" />
      <NavLink to="/auth/register" text="Register" />
    </div>
  );
};

const Navbar = ({ toggler = () => {}, showToggler = false }) => {
  const { user, isLoggedIn } = useAuth();

  const fullName = useMemo(
    () =>
      [user?.firstName.trim() || "", user?.lastName.trim() || ""]
        .join(" ")
        .trim(),
    [user]
  );

  return (
    <nav className="h-[72px] w-full bg-white  border-solid border-[4px] border-x-0 border-t-0 border-[#28B463] shadow-sm px-5 flex items-center justify-between">
      {showToggler ? (
        <IconButton onClick={toggler}>
          <RxHamburgerMenu
            size={20}
            fontWeight="bold"
            color="#19181a"
            className="cursor-pointer"
          />
        </IconButton>
      ) : (
        <div></div>
      )}
      <div>
        {isLoggedIn && (
          <Popover
            content={<Account />}
            placement="bottomRight"
            title={
              <div className="flex flex-col gap-3 items-center pt-3">
                <div className="flex border-solid border-[1px] border-[#e7e7e7] rounded-[50%] p-[1px]">
                  <Avatar className="bg-[#1A73E2] shadow-md" size={75}>
                    {SplitWords(fullName)}
                  </Avatar>
                </div>
                <Typography.Title level={4}>{fullName}</Typography.Title>
              </div>
            }
          >
            <RxAvatar
              size={38}
              fontWeight={700}
              color="#19181a"
              className="cursor-pointer"
            />
          </Popover>
        )}
        {!isLoggedIn && <PublicNav />}
      </div>
    </nav>
  );
};

export default Navbar;
