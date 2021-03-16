import '../src/snc-wds-rw';

const el = document.createElement('DIV');
document.body.appendChild(el);

el.innerHTML = `		
<snc-wds-rw table="incident" filter="active=true"></snc-wds-rw>
`;
