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

st.divider()
st.subheader("🌐 IP Information Lookup")

ip_input = st.text_input("Enter IP Address (e.g., 8.8.8.8):", placeholder="127.0.0.1")

if st.button("Scan IP"):
    if ip_input:
        try:
            response = requests.get(f"https://ipapi.co/{ip_input}/json/").json()
            
            if "error" not in response:
                col1, col2 = st.columns(2)
                with col1:
                    st.write(f"**City:** {response.get('city')}")
                    st.write(f"**Region:** {response.get('region')}")
                    st.write(f"**Country:** {response.get('country_name')}")
                with col2:
                    st.write(f"**ISP:** {response.get('org')}")
                    st.write(f"**ASN:** {response.get('asn')}")
                    st.write(f"**Lat/Long:** {response.get('latitude')}, {response.get('longitude')}")
                
                st.map({"lat": [response.get('latitude')], "lon": [response.get('longitude')]})
            else:
                st.error("Invalid IP or API Error.")
        except Exception as e:
            st.error(f"Error: {e}")
    else:
        st.warning("Please enter an IP address.")
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
