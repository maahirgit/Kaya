export default function ClientsVideo() {
  return (
    <section className="video-section section-padding bg-white" id="video-showcase">
      <div className="container text-center mb-lg">
        <span className="eyebrow reveal-up">Our Craftsmanship</span>
        <h2 className="section-title reveal-up delay-1">Manufacturing <span className="text-blue">Excellence</span></h2>
        <div className="accent-divider center-div reveal-up delay-2"></div>
      </div>
      
      <div className="container reveal-up delay-3">
        <div className="video-container">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            poster="https://images.pexels.com/photos/3735641/pexels-photo-3735641.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          >
            <source src="https://player.vimeo.com/external/494252666.sd.mp4?s=72fbffcb1c4b036506d87e07ae40498762d1840&profile_id=165&oauth2_token_id=57447761" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="video-overlay"></div>
        </div>
      </div>
    </section>
  )
}

