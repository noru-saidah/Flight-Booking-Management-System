/* ================================================================
   FLYME - IMS566 FLIGHT BOOKING MANAGEMENT SYSTEM
   Front-end academic prototype. Data is saved in this browser only.

   QUICK EDIT GUIDE:
   1. Account settings: ACCOUNT STORAGE section below.
   2. Example flight records: SAMPLE BOOKING DATA section.
   3. Login / registration behaviour: AUTHENTICATION section.
   4. Dashboard, bookings, passengers and calendar: named sections.
   ================================================================ */

// ACCOUNT STORAGE: Registered accounts are saved in localStorage on this device.
// This is suitable for an academic prototype only, not for a real secure website.
const ACCOUNTS_KEY = "flyMeAccounts";
const STORAGE_KEY = "flyMeBookings";

// SAMPLE BOOKING DATA: Edit these objects to change the example reservations.

const sampleBookings = [
 {id:"VW-1001",name:"Safia Amalin",email:"sfamalin.rahman@gmail.com",flight:"VW204",route:"KUL → SIN",departure:"2026-12-04",travelClass:"Economy",amount:289,status:"Confirmed"},
 {id:"VW-1002",name:"Izwan Hakimi",email:"izwanhakimi5@gmail.com",flight:"VW318",route:"KUL → BKK",departure:"2026-12-06",travelClass:"Business",amount:860,status:"Pending"},
 {id:"VW-1003",name:"Faiz Iskandar",email:"faiziskndr@gmail.com",flight:"VW410",route:"PEN → KUL",departure:"2026-12-09",travelClass:"Economy",amount:155,status:"Confirmed"},
 {id:"VW-1004",name:"Amer Faiz",email:"amerfx@gmail.com",flight:"VW522",route:"KUL → DPS",departure:"2026-12-12",travelClass:"First",amount:1490,status:"Cancelled"},
 {id:"VW-1005",name:"Rifa Basheerah",email:"rfsheerah6@gmail.com",flight:"VW204",route:"KUL → SIN",departure:"2026-12-15",travelClass:"Economy",amount:289,status:"Pending"},
 {id:"VW-1006",name:"Nuriyah Aziz",email:"nuriyah35@gmail.com",flight:"VW701",route:"KUL → LHR",departure:"2026-12-18",travelClass:"Business",amount:4250,status:"Confirmed"}
];
// COMMON HELPERS: Small functions reused by different pages.
const $ = (id) => document.getElementById(id);

// Read all registered accounts. Return an empty array when no account exists yet.
function getAccounts(){
 try { const data = JSON.parse(localStorage.getItem(ACCOUNTS_KEY)); return Array.isArray(data) ? data : []; }
 catch(e){ return []; }
}

// Save the account list in this browser. For production, use a secure backend.
function saveAccounts(accounts){ localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts)); }

function getBookings(){
 try {
  const data=JSON.parse(localStorage.getItem(STORAGE_KEY));
  if(!Array.isArray(data)) return sampleBookings;
  // SAMPLE DATA UPDATE: Rename the six original sample passengers without changing their booking details.
  const passengerUpdates={"Safia Amalin":"sfamalin.rahman@gmail.com","Izwan Hakimi":"izwanhakimi5@gmail.com","Faiz Iskandar":"faiziskndr@gmail.com","Amer Faiz":"amerfx@gmail.com","Rifa Basheerah":"rfsheerah6@gmail.com","Nuriyah Aziz":"nuriyah35@gmail.com"};
  let changed=false;
  const updated=data.map(item=>{
   if(previousSampleNames[item.name]){changed=true;return {...item,name:previousSampleNames[item.name]};}
   return item;
  });
  if(changed) saveBookings(updated);
  return updated;
 } catch(e){ return sampleBookings; }
}
function saveBookings(data){ localStorage.setItem(STORAGE_KEY,JSON.stringify(data)); }
function escapeHTML(value){return String(value??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function money(v){return Number(v||0).toLocaleString("en-MY",{minimumFractionDigits:2,maximumFractionDigits:2});}
function dateText(v){if(!v)return "—";const d=new Date(v+"T00:00:00");return d.toLocaleDateString("en-MY",{day:"2-digit",month:"short",year:"numeric"});}
function badge(status){return `<span class="status-badge status-${status.toLowerCase()}">${escapeHTML(status)}</span>`;}
function requireAuth(){if(!sessionStorage.getItem("vwSignedIn") && !location.pathname.endsWith("login.html") && !location.pathname.endsWith("index.html")) location.href="login.html";}
// AUTHENTICATION: Login checks the account created through the registration page.
function setupLogin(){
 const form=$("loginForm"); if(!form)return;
 form.addEventListener("submit",e=>{
  e.preventDefault();
  const username=$("username").value.trim().toLowerCase();
  const password=$("password").value;
  const alert=$("loginAlert");
  const account=getAccounts().find(user=>user.username.toLowerCase()===username && user.password===password);
  if(account){
   sessionStorage.setItem("vwSignedIn","yes");
   sessionStorage.setItem("flyMeCurrentUser",account.fullName);
   // Keep the login username so the dashboard header can display the signed-in account.
   sessionStorage.setItem("flyMeCurrentUsername",account.username);
   location.href="dashboard.html";
  }else{
   alert.textContent="The username or password is incorrect. Please create an account first if you are new to FlyMe.";
   alert.classList.remove("d-none");
  }
 });
}

// REGISTRATION: Validate the form and prevent duplicate usernames or email addresses.
function setupRegistration(){
 const form=$("registerForm"); if(!form)return;
 form.addEventListener("submit",e=>{
  e.preventDefault();
  const fullName=$("fullName").value.trim();
  const username=$("newUsername").value.trim();
  const email=$("newEmail").value.trim().toLowerCase();
  const password=$("newPassword").value;
  const confirmPassword=$("confirmPassword").value;
  const alert=$("registerAlert");
  const success=$("registerSuccess");
  alert.classList.add("d-none"); success.classList.add("d-none");

  if(password!==confirmPassword){
   alert.textContent="The passwords do not match. Please try again.";
   alert.classList.remove("d-none"); return;
  }
  const accounts=getAccounts();
  if(accounts.some(user=>user.username.toLowerCase()===username.toLowerCase())){
   alert.textContent="That username is already registered. Please choose another one.";
   alert.classList.remove("d-none"); return;
  }
  if(accounts.some(user=>user.email.toLowerCase()===email)){
   alert.textContent="That email address is already registered. Please use another email.";
   alert.classList.remove("d-none"); return;
  }
  accounts.push({fullName,username,email,password});
  saveAccounts(accounts);
  form.reset();
  success.textContent="Your account has been created. You can now sign in.";
  success.classList.remove("d-none");
 });
}
function setupShell(){
 // PERSONALISE THE HEADER: Show the username that signed in; keep the role as "System manager".
 const signedInUsername = sessionStorage.getItem("flyMeCurrentUsername") || "Administrator";
 // DASHBOARD GREETING: Personalise the welcome message for the account currently signed in.
 const greetingName = $("dashboardGreetingName");
 if(greetingName) greetingName.textContent = signedInUsername;
 document.querySelectorAll("[data-current-username]").forEach(el => { el.textContent = signedInUsername; });
 document.querySelectorAll("[data-user-avatar]").forEach(el => { el.textContent = signedInUsername.charAt(0).toUpperCase(); });
 const current=location.pathname.split("/").pop().replace(".html","");
 document.querySelectorAll("[data-nav]").forEach(a=>{if(a.dataset.nav===current)a.classList.add("active");});
 const title=document.querySelector(`[data-nav="${current}"]`);if(title&&$("pageTitle"))$("pageTitle").textContent=title.textContent.trim();
 $("logoutBtn")?.addEventListener("click",()=>{sessionStorage.removeItem("vwSignedIn");sessionStorage.removeItem("flyMeCurrentUser");sessionStorage.removeItem("flyMeCurrentUsername");location.href="login.html";});
 $("menuToggle")?.addEventListener("click",()=>$("sidebar")?.classList.toggle("open"));
}
// DASHBOARD: Update statistic cards, status summary, recent bookings and chart.
function renderDashboard(){
 const b=getBookings(),count=s=>b.filter(x=>x.status===s).length;
 if(!$("statTotal"))return;
 $("statTotal").textContent=b.length;$("statConfirmed").textContent=count("Confirmed");$("statPending").textContent=count("Pending");
 $("statPassengers").textContent=new Set(b.map(x=>x.email.toLowerCase())).size;
 const total=b.length||1;
 $("statusSummary").innerHTML=["Confirmed","Pending","Cancelled"].map(s=>`<div class="status-row"><span>${s}</span><div class="status-track"><div class="status-fill ${s.toLowerCase()}" style="width:${count(s)/total*100}%"></div></div><strong>${count(s)}</strong></div>`).join("");
 $("recentBookings").innerHTML=b.slice().sort((a,c)=>c.id.localeCompare(a.id)).slice(0,5).map(x=>`<tr><td><strong>${escapeHTML(x.id)}</strong></td><td>${escapeHTML(x.name)}</td><td>${escapeHTML(x.route)}</td><td>${dateText(x.departure)}</td><td>${badge(x.status)}</td></tr>`).join("")||'<tr><td colspan="5" class="empty-state">No bookings yet.</td></tr>';
 const ctx=$("bookingChart");if(ctx&&window.Chart){const months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];const values=months.map((_,i)=>b.filter(x=>new Date(x.departure+"T00:00:00").getMonth()===i).length);new Chart(ctx,{type:"bar",data:{labels:months,datasets:[{label:"Bookings",data:values,backgroundColor:"#78947c",borderRadius:6,maxBarThickness:24}]},options:{maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{grid:{display:false},ticks:{color:"#8b9288"}},y:{beginAtZero:true,ticks:{precision:0,color:"#8b9288"},grid:{color:"#efeee8"}}}}});}
}
// FLIGHT BOOKINGS: Search, filter, display, edit and delete reservation records.
function renderBookings(){
 const tbody=$("bookingRows");if(!tbody)return;const b=getBookings();
 const q=$("bookingSearch").value.toLowerCase(),status=$("statusFilter").value;
 const filtered=b.filter(x=>(!status||x.status===status)&&[x.id,x.name,x.email,x.route,x.flight].join(" ").toLowerCase().includes(q));
 tbody.innerHTML=filtered.map(x=>`<tr><td><strong>${escapeHTML(x.id)}</strong></td><td><strong>${escapeHTML(x.name)}</strong><small class="d-block muted">${escapeHTML(x.email)}</small></td><td><strong>${escapeHTML(x.flight)}</strong><small class="d-block muted">${escapeHTML(x.route)}</small></td><td>${dateText(x.departure)}</td><td>${escapeHTML(x.travelClass)}</td><td>${money(x.amount)}</td><td>${badge(x.status)}</td><td><button class="action-btn" data-edit="${escapeHTML(x.id)}" aria-label="Edit ${escapeHTML(x.id)}">Edit</button><button class="action-btn delete" data-delete="${escapeHTML(x.id)}" aria-label="Delete ${escapeHTML(x.id)}">Delete</button></td></tr>`).join("")||'<tr><td colspan="8" class="empty-state">No matching bookings found.</td></tr>';
 $("bookingCount").textContent=`Showing ${filtered.length} of ${b.length} bookings`;
 tbody.querySelectorAll("[data-edit]").forEach(btn=>btn.addEventListener("click",()=>openEdit(btn.dataset.edit)));
 tbody.querySelectorAll("[data-delete]").forEach(btn=>btn.addEventListener("click",()=>{if(confirm("Delete this booking record?")){saveBookings(getBookings().filter(x=>x.id!==btn.dataset.delete));renderBookings();showToast("Booking deleted.");}}));
}
// EDIT BOOKING: Load the selected reservation into the Bootstrap modal.
function openEdit(id){
 const item=getBookings().find(x=>x.id===id);if(!item)return;
 $("bookingModalTitle").textContent="Edit booking";$("editBookingId").value=item.id;
 $("passengerName").value=item.name;$("passengerEmail").value=item.email;$("flightCode").value=item.flight;$("route").value=item.route;
 $("departure").value=item.departure;$("travelClass").value=item.travelClass;$("amount").value=item.amount;$("bookingStatus").value=item.status;
 bootstrap.Modal.getOrCreateInstance($("bookingModal")).show();
}
// BOOKING FORM: Save new reservations or update an existing reservation.
function setupBookingForm(){
 if(!$("bookingForm"))return;
 $("openAddBooking")?.addEventListener("click",()=>{$("bookingForm").reset();$("editBookingId").value="";$("bookingModalTitle").textContent="Add new booking";});
 $("bookingSearch").addEventListener("input",renderBookings);$("statusFilter").addEventListener("change",renderBookings);
 $("bookingForm").addEventListener("submit",e=>{e.preventDefault();const all=getBookings(),editId=$("editBookingId").value;
 const nextNum=Math.max(1000,...all.map(x=>Number(x.id.split("-")[1])||1000))+1;const item={id:editId||"VW-"+nextNum,name:$("passengerName").value.trim(),email:$("passengerEmail").value.trim(),flight:$("flightCode").value.trim().toUpperCase(),route:$("route").value.trim().toUpperCase(),departure:$("departure").value,travelClass:$("travelClass").value,amount:Number($("amount").value),status:$("bookingStatus").value};
 const next=editId?all.map(x=>x.id===editId?item:x):[item,...all];saveBookings(next);bootstrap.Modal.getInstance($("bookingModal")).hide();renderBookings();showToast(editId?"Booking updated.":"New booking added.");});
 renderBookings();
}
function showToast(message){const el=$("appToast");if(!el)return;el.querySelector(".toast-body").textContent=message;bootstrap.Toast.getOrCreateInstance(el).show();}
// PASSENGERS: Build the passenger list from the saved booking records.
function renderCustomers(){
 if(!$("customerRows"))return;const b=getBookings(),map=new Map();
 b.forEach(x=>{const key=x.email.toLowerCase();if(!map.has(key))map.set(key,{name:x.name,email:x.email,bookings:[],latest:x.departure});const c=map.get(key);c.bookings.push(x);if(x.departure>c.latest)c.latest=x.departure;});
 const q=$("customerSearch").value.toLowerCase(),customers=[...map.values()].filter(x=>(x.name+" "+x.email).toLowerCase().includes(q));
 $("customerTotal").textContent=`${map.size} passengers`;
 $("customerRows").innerHTML=customers.map(c=>`<tr><td><strong>${escapeHTML(c.name)}</strong></td><td>${escapeHTML(c.email)}</td><td>${c.bookings.length}</td><td>${c.bookings.filter(x=>x.status==="Confirmed").length}</td><td>${dateText(c.latest)}</td></tr>`).join("")||'<tr><td colspan="5" class="empty-state">No passenger records found.</td></tr>';
}
// BOOKING CALENDAR: Display departure dates and their reservation details.
function setupCalendar(){
 if(!$("calendarDays"))return;let shown=new Date();shown.setDate(1);let selected=null;
 function draw(){
  const y=shown.getFullYear(),m=shown.getMonth(),first=new Date(y,m,1).getDay(),days=new Date(y,m+1,0).getDate(),today=new Date();
  $("calendarMonth").textContent=shown.toLocaleDateString("en-MY",{month:"long",year:"numeric"});
  let html="";for(let i=0;i<first;i++)html+='<div class="calendar-day empty"></div>';
  for(let d=1;d<=days;d++){const key=`${y}-${String(m+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`,items=getBookings().filter(x=>x.departure===key);const isToday=y===today.getFullYear()&&m===today.getMonth()&&d===today.getDate();
   html+=`<button class="calendar-day ${isToday?"today":""} ${selected===key?"selected":""}" data-date="${key}"><span class="day-num">${d}</span>${items.slice(0,2).map(x=>`<span class="calendar-event ${x.status==="Pending"?"pending-event":""}">${escapeHTML(x.flight)} · ${escapeHTML(x.route)}</span>`).join("")}</button>`;
  }$("calendarDays").innerHTML=html;
  $("calendarDays").querySelectorAll("[data-date]").forEach(el=>el.addEventListener("click",()=>{selected=el.dataset.date;draw();showDate(selected);}));
  if(!selected)showDate(`${y}-${String(m+1).padStart(2,"0")}-01`);
 }
 function showDate(key){const items=getBookings().filter(x=>x.departure===key);$("selectedDateTitle").textContent=dateText(key);$("selectedDateBookings").innerHTML=items.map(x=>`<div class="schedule-item"><div><strong>${escapeHTML(x.flight)} · ${escapeHTML(x.route)}</strong><small>${escapeHTML(x.name)} · ${escapeHTML(x.travelClass)}</small></div><div>${badge(x.status)}</div></div>`).join("")||'<p class="muted small mb-0">No departures recorded for this date.</p>';}
 $("prevMonth").addEventListener("click",()=>{shown.setMonth(shown.getMonth()-1);draw();});$("nextMonth").addEventListener("click",()=>{shown.setMonth(shown.getMonth()+1);draw();});draw();
}
// PAGE INITIALISATION: Start only the functions needed by the current page.
document.addEventListener("DOMContentLoaded",()=>{
 setupLogin();
 setupRegistration();
 if(location.pathname.endsWith("login.html") || location.pathname.endsWith("register.html") || location.pathname.endsWith("index.html")) return;
 requireAuth();
 setupShell();
 renderDashboard();
 setupBookingForm();
 renderCustomers();
 $("customerSearch")?.addEventListener("input",renderCustomers);
 setupCalendar();
});
