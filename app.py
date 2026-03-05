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
