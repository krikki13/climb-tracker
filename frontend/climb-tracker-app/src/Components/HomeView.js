import Link from 'react-router-dom/es/Link';
import '../index.css';


function HomeView() {
  var header = [
    {label: "Slovenska plezališča", link: "", class: "header-item-left"},
    {label: "Tuja plezališča", link: "", class: "header-item-left"},
    {label: "Plezalni dnevnik", link: "", class: "header-item-left"},
    {label: "Prijavi se", link: "login", class: "header-item-right"}
  ];

  return (
    <div className="App">
      <div className="header">
        {header.map(item => <Link to={item.link} class={item.class}>{item.label}</Link>)}
        <div style={{clear: "both"}}></div>
      </div>
    </div>
  );
}

export default HomeView;
