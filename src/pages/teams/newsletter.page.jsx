
import { motion } from "framer-motion";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/footer";
import Button from "../../components/ui/Button";
import { FileDown, Eye } from "lucide-react"; // Added Zap icon


// List of PDFs in public folder
const pdfs = [
  { title: "Newsletter Oct 2024", url: "/EDITION 02 THE COSMIC EXPRESS.pdf" },
  { title: "Newsletter Aug 2023", url: "/Edition 01 The Cosmic Express_compressed.pdf" },
];

const NewsletterPage = () => {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 px-6 md:px-16 flex flex-col items-center text-center">
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Antariksh <span className="text-blue-400">Newsletter</span>
        </motion.h1>
        <motion.p
          className="max-w-3xl text-white/90 text-lg md:text-xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          The creative minds curating Antariksh’s monthly cosmic digest — bringing space closer to you through stories, visuals, and events.
        </motion.p>
      </section>

      {/* Latest Newsletters */}
      <section className="py-16 px-6 md:px-16 bg-black/80 backdrop-blur-sm rounded-3xl mx-4 md:mx-16">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-white text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Latest <span className="text-blue-400">Editions</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8"> {/* Adjusted grid for more balance */}
          {pdfs.map((pdf, i) => (
            <motion.div
              key={i}
              className="bg-black/60 backdrop-blur-md p-6 rounded-2xl text-center text-white shadow-lg hover:shadow-blue-400/40 transition-transform transform hover:scale-[1.02] flex flex-col justify-between"
              initial={{ opacity: 0, y: 40 }} // More pronounced initial Y offset
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }} // Ensures animation runs only once when visible
              transition={{ duration: 0.6, delay: i * 0.2 }} // Increased delay for a cascade effect
            >
              <h3 className="text-xl font-bold mb-3">{pdf.title}</h3>

              {/* PDF Preview */}
              <div className="w-full h-64 mb-4 overflow-hidden rounded-lg border border-white/20">
                <iframe
                  src={`${pdf.url}#view=fitH`}
                  title={pdf.title}
                  className="w-full h-full"
                />
              </div>

              <div className="flex justify-center gap-4 mt-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => window.open(pdf.url, "_blank")}
                  className="flex items-center gap-2 hover:bg-blue-400/20"
                >
                  <Eye size={16} /> View
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = pdf.url;
                    link.download = pdf.title;
                    link.click();
                  }}
                  className="flex items-center gap-2"
                >
                  <FileDown size={16} /> Download
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      


      <Footer />
    </>
  );
};

export default NewsletterPage;