import {
  FaMailBulk,
  FaPhone,
  FaChild,
  FaMoneyBill,
  FaBirthdayCake,
  FaKey,
} from 'react-icons/fa';

export default function Resume({
  phone,
  mail,
  familyBurden,
  estimatedSave,
  birthday = 0,
  owner,
}: {
  phone: string;
  mail?: string;
  familyBurden?: number;
  estimatedSave?: number;
  birthday?: number;
  owner: string;
}) {
  return (
    <div className="py-4 text-left">
      <p className="m-auto inline-flex gap-2 align-middle">
        <FaPhone className="socialIcon m-auto" />
        <span className="m-auto text-sm">{phone}</span>
      </p>
      <br />
      {mail && (
        <>
          <p className="m-auto inline-flex gap-2 align-middle">
            <FaMailBulk className="socialIcon m-auto" />
            <span className="m-auto text-sm">{mail}</span>
          </p>
          <br />
        </>
      )}
      <div className="m-auto inline-flex gap-5 align-middle">
        {familyBurden && (
          <p className="m-auto inline-flex gap-2 align-middle">
            <FaChild className="socialIcon m-auto" />
            <span className="m-auto text-sm">{familyBurden}</span>
          </p>
        )}

        {estimatedSave && (
          <p className="m-auto inline-flex gap-2 align-middle">
            <FaMoneyBill className="socialIcon m-auto" />
            <span className="m-auto text-sm">${estimatedSave}</span>
          </p>
        )}

        {birthday >= 0 && (
          <p className="m-auto inline-flex gap-2 align-middle">
            <FaBirthdayCake className="socialIcon m-auto" />
            <span className="m-auto text-sm">{birthday} años</span>
          </p>
        )}
      </div>
      <br />
      <p className="m-auto inline-flex gap-2 align-middle">
        <FaKey className="socialIcon m-auto" />
        <span className="m-auto text-sm">{owner}</span>
      </p>
    </div>
  );
}
