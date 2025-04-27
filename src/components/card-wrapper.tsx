import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";


type cardwrapperProps = {
  children: React.ReactNode;
  heading: string;
  subheading: string;
  backButtonLabel: string;
  backButtonHref: string;
};

export const CardWrapper = ({
  children,
  heading,
  subheading,
  backButtonLabel,
  backButtonHref,
}: cardwrapperProps) => {
  return (
    <Card className="lg:w-[25%] w-[80%] sm:w-[50%] md:w-[42%]">
      <CardHeader>
        <div className="w-full flex flex-col justify-center items-center gap-1">
          <h1 className="text-2xl font-semibold">{heading}</h1>
          <p className="dark:font-extralight">{subheading}</p>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className="flex items-center justify-center cursor-pointer">
        <div className="dark:font-light">
          Changed your mind? <Link to={backButtonHref} className="hover:underline underline-offset-2">{backButtonLabel}</Link>
        </div>
      </CardFooter>
    </Card>
  );
};
