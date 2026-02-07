import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DayLayout from "@/components/DayLayout";
import TypewriterText from "@/components/TypewriterText";
import { Button } from "@/components/ui/button";
import FloatingHearts from "@/components/FloatingHearts";
import { toast } from "sonner";
import { sendEmail } from "@/lib/email";

const LETTER = `എടി പൊന്നി ,എനിക്ക് പ്രൊപ്പോസ് ചെയ്യാൻ ഒന്നും അറിയില്ല എന്നാലും ഞാൻ ട്രൈ ചെയ്യാം ....
എന്റെ ലൈഫിൽ എനിക്ക് നിന്നോട് തോന്നുന്ന അത്രയും പ്രാന്തും ,സ്നേഹവും ,എല്ലാം ഇതുവരെ ഒരു മനുഷ്യരോടും  തോന്നിയിട് ഇല്ല...നീ എന്റെ അടുത് ഇല്ലാത്തപ്പോൾ ഒക്കെ എനിക്ക് ഭയങ്കര വിഷമം ആണ്....നീ എന്നെ കൊറേ സ്നേഹിക്കുന്നുണ്ടെന്ന് എനിക്ക് അറിയാം.സത്യം പറഞ്ഞാൽ നമ്മടെ അടി മുഴുവൻ സ്നേഹക്കൂടുതൽ കൊണ്ട് ഉണ്ടാവുന്നതാ...അതോണ്ട് പൊന്നി നീ വേഷമിക്കല്ലേ...ഞാൻ ഇന്നലെ പറഞ്ഞ പോലെ എത്ര അടി ഇട്ടാലും STILL I LOVE YOU 💖. 
AND HERE COMES THE QUESTION I HAVE TO ASK IN THIS PROPOSAL DAY.WILL YOU MARRY ME.💍 താഴെ NO വെക്കുന്നില്ല കാരണം I ONLY EXPECT YES FROM YOU.`;

export default function Day2Propose() {
  const [showButton, setShowButton] = useState(false);
  const [heartBurst, setHeartBurst] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  const handleComplete = useCallback(() => {
    setShowButton(true);
  }, []);

  const handleYes = async () => {
    setHeartBurst(true);
    setTimeout(() => setHeartBurst(false), 4000);

    // Send email with "yes" message
    setIsSendingEmail(true);
    try {
      const success = await sendEmail({
        message: "yes",
        from_name: "Seven Days of Us",
      });

      if (success) {
        toast.success("Email sent! 💌", {
          description: "Your 'yes' has been sent via email!",
        });
      } else {
        toast.error("Email not configured", {
          description: "Please set up EmailJS environment variables.",
        });
      }
    } catch (error) {
      toast.error("Failed to send email", {
        description: "There was an error sending the email.",
      });
    } finally {
      setIsSendingEmail(false);
    }
  };

  return (
    <DayLayout title="Propose Day" emoji="💍" className="bg-background">
      {heartBurst && <FloatingHearts count={40} />}

      <div className="relative z-10 max-w-md mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-card rounded-3xl p-8 shadow-xl border border-primary/10"
        >
          <TypewriterText
            text={LETTER}
            speed={40}
            className="font-display text-foreground leading-relaxed whitespace-pre-line text-base italic"
            onComplete={handleComplete}
          />
        </motion.div>

        <AnimatePresence>
          {showButton && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <Button
                onClick={handleYes}
                disabled={isSendingEmail}
                className="h-14 px-10 text-lg font-handwritten bg-primary hover:bg-primary/90 rounded-full shadow-lg disabled:opacity-50"
              >
                {isSendingEmail ? "Sending..." : "YES ❤️"}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {heartBurst && (
            <motion.p
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center font-handwritten text-2xl text-primary"
            >
              And I'd ask you again, every single day 💕
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </DayLayout>
  );
}
