import jabb from '../jabb.config';

export default function Footer1() {
  return (
    <div className="footer">
      <picture>
        <source
          srcSet="/images/logo/white.png"
          media="(prefers-color-scheme: dark)"
        />
        <img
          src="/images/logo/logo.png"
          alt={`logo ${jabb.company.commercialName}`}
          loading="lazy"
          width={180}
          className="mx-auto"
        />
      </picture>
    </div>
  );
}
