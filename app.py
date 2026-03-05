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
