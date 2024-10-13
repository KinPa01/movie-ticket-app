import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <img 
        src="https://scontent.fcnx4-1.fna.fbcdn.net/v/t1.15752-9/462456276_1180958966322099_1046800223891973783_n.png?_nc_cat=109&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeFRCucqrdlUQIUuOhGSkDaMCvepmFZtCIIK96mYVm0IgkrN5Uv6Nu2PJKvUbjx_Thcj3VZtga_O0qn8W_DJrGPZ&_nc_ohc=Dg4yZ33XQ-cQ7kNvgFfxAuw&_nc_ht=scontent.fcnx4-1.fna&_nc_gid=AVDMkiPeZgt6WkT6Zm86KQe&oh=03_Q7cD1QGqFCzfDa8qxo7yki0qdpIoDvcCa93N7McHR-N3OcXhaA&oe=673203A1" 
        alt="Logo" 
        className="logo"
      />
      <h1>The Dog Movie</h1>
    </header>
  );
}

export default Header;
