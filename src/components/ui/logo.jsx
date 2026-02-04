import logo from "../../assets/brand/logo.png";
import { Link } from "react-router-dom";
export default function Logo({ className = "", alt = "Logo", onClick, href }) {
  const img = (
    <img
      src={logo}
      alt={alt}
      className={`object-contain cursor-pointer ${className}`}
    />
  );

  if (href) {
    return (
      <Link to={href} className="inline-block">
        {img}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className="inline-block">
      {img}
    </button>
  );
}
