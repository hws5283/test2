import AtlasMarkerComponent from "./AtlasMakrerComponent";

export default function HeaderComponent(props) {
  return (
    <div className={props.className}>
      <button className="headerBtn" onClick={props.onClick}>
        {props.title}
      </button>
      {props.locations.map((loc) => (
        <AtlasMarkerComponent key={loc.feature} title={loc.feature} />
      ))}
    </div>
  );
}
