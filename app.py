import streamlit as st

st.set_page_config(
    page_title="Sentinel-X",
    page_icon="🛡️",
    layout="wide"
)

st.markdown(
    """
    <head>
        <link rel="manifest" href="./manifest.json">
        <script>
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('./service-worker.js')
                .then(function(reg) { console.log('Service Worker Registered!'); })
                .catch(function(err) { console.log('Service Worker Failed!', err); });
              });
            }
        </script>
    </head>
    """,
    unsafe_allow_html=True
)

st.title("🛡️ Sentinel-X: Cyber Security Suite")
st.success("Welcome back, Satyam! App mode is now active.")

with st.sidebar:
    st.header("Control Panel")
    st.info("Sentinel-X v1.0")
    if st.button("Check Updates"):
        st.write("System is up to date.")

st.divider()
st.subheader("System Status")
st.write("All modules are ready for reconnaissance.")
import requests
import folium
from streamlit_folium import st_folium

st.divider()
st.subheader("🌐 IP Information Lookup")

if "target_ip" not in st.session_state:
    st.session_state.target_ip = None

ip_input = st.text_input("Enter IP Address (e.g., 8.8.8.8):", placeholder="127.0.0.1")

if st.button("Scan IP"):
    if ip_input:
        st.session_state.target_ip = ip_input
    else:
        st.warning("Please enter an IP address.")

if st.session_state.target_ip:
    try:
        response = requests.get(f"http://ip-api.com/json/{st.session_state.target_ip}").json()
        
        if response.get("status") == "success":
            col1, col2 = st.columns(2)
            with col1:
                st.write(f"**City:** {response.get('city')}")
                st.write(f"**Region:** {response.get('regionName')}")
                st.write(f"**Country:** {response.get('country')}")
            with col2:
                st.write(f"**ISP:** {response.get('isp')}")
                st.write(f"**ASN:** {response.get('as')}")
                st.write(f"**Lat/Long:** {response.get('lat')}, {response.get('lon')}")
            
            # Fetch Coordinates
            lat = float(response.get('lat', 0))
            lon = float(response.get('lon', 0))
            
            # Create Folium Map with Pin
            m = folium.Map(location=[lat, lon], zoom_start=12)
            folium.Marker(
                [lat, lon],
                popup=f"IP: {st.session_state.target_ip}",
                tooltip=response.get('city', 'Location'),
                icon=folium.Icon(color="red", icon="info-sign")
            ).add_to(m)
            
            # Render Map
            st_folium(m, width=700, height=400, returned_objects=[])
        else:
            st.error(f"Error: {response.get('message', 'Invalid IP or API Error.')}")
    except Exception as e:
        st.error(f"Error: {e}")
import socket

st.divider()
st.subheader("🔍 Basic Port Scanner")

target = st.text_input("Enter Target URL or IP (e.g., scanme.nmap.org):", placeholder="scanme.nmap.org")
common_ports = [21, 22, 23, 25, 53, 80, 110, 443, 3306, 3389]

if st.button("Start Port Scan"):
    if target:
        st.write(f"Scanning {target}...")
        results = []
        
        # Simple loop to check ports
        for port in common_ports:
            s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            s.settimeout(0.5)
            result = s.connect_ex((target, port))
            if result == 0:
                results.append(f"✅ Port {port} is OPEN")
            s.close()
        
        if results:
            for res in results:
                st.write(res)
        else:
            st.info("No common ports are open or target is filtered.")
    else:
        st.warning("Please enter a target to scan.")
