import React, { useRef, useState } from 'react';
import styled from 'styled-components'
import { Snackbar, Alert } from '@mui/material';

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
position: relative;
z-index: 1;
align-items: center;
@media (max-width: 960px) {
    padding: 0px;
}
`

const Wrapper = styled.div`
position: relative;
display: flex;
justify-content: space-between;
align-items: center;
flex-direction: column;
width: 100%;
max-width: 1350px;
padding: 0px 0px 80px 0px;
gap: 12px;
@media (max-width: 960px) {
    flex-direction: column;
}
`

const Title = styled.div`
font-size: 42px;
text-align: center;
font-weight: 600;
margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
      margin-top: 12px;
      font-size: 32px;
  }
`;

const Desc = styled.div`
    font-size: 18px;
    text-align: center;
    max-width: 600px;
    color: ${({ theme }) => theme.text_secondary};
    @media (max-width: 768px) {
        margin-top: 12px;
        font-size: 16px;
    }
`;


const ContactForm = styled.form`
  width: 95%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.card};
  padding: 32px;
  border-radius: 16px;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  margin-top: 28px;
  gap: 12px;
`

const ContactTitle = styled.div`
  font-size: 24px;
  margin-bottom: 6px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`

const ContactInput = styled.input`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`

const ContactInputMessage = styled.textarea`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`

const ContactButton = styled.input`
  width: 100%;
  text-decoration: none;
  text-align: center;
  background: hsla(271, 100%, 50%, 1);
  background: linear-gradient(225deg, hsla(271, 100%, 50%, 1) 0%, hsla(294, 100%, 50%, 1) 100%);
  background: -moz-linear-gradient(225deg, hsla(271, 100%, 50%, 1) 0%, hsla(294, 100%, 50%, 1) 100%);
  background: -webkit-linear-gradient(225deg, hsla(271, 100%, 50%, 1) 0%, hsla(294, 100%, 50%, 1) 100%);
  padding: 13px 16px;
  margin-top: 2px;
  border-radius: 12px;
  border: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

const ErrorText = styled.span`
  color: #ff6b6b;
  font-size: 13px;
  margin-top: -6px;
  margin-left: 4px;
`

const SuccessBanner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: linear-gradient(135deg, #16a34a 0%, #22c55e 100%);
  color: white;
  padding: 14px 18px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  box-shadow: 0 6px 24px rgba(34, 197, 94, 0.45);
  margin-bottom: 4px;
  animation: slideDown 0.4s ease-out;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

const SuccessIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.25);
  font-size: 16px;
`

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateField = (name, value) => {
  const v = (value || "").trim();
  switch (name) {
    case "from_email":
      if (!v) return "L'email est obligatoire.";
      if (!EMAIL_REGEX.test(v)) return "Format d'email invalide.";
      return "";
    case "from_name":
      if (!v) return "Le nom est obligatoire.";
      if (v.length < 2) return "Le nom doit contenir au moins 2 caractères.";
      return "";
    case "subject":
      if (!v) return "Le sujet est obligatoire.";
      if (v.length < 3) return "Le sujet doit contenir au moins 3 caractères.";
      return "";
    case "message":
      if (!v) return "Le message est obligatoire.";
      if (v.length < 5) return "Le message doit contenir au moins 5 caractères.";
      if (v.length > 1000) return "Le message ne peut pas dépasser 1000 caractères.";
      return "";
    default:
      return "";
  }
};

const Contact = () => {
  const form = useRef();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, severity: "success", message: "" });

  const showSnackbar = (severity, message) =>
    setSnackbar({ open: true, severity, message });

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      from_name: form.current.from_name.value,
      from_email: form.current.from_email.value,
      subject: form.current.subject.value,
      message: form.current.message.value,
    };

    const newErrors = Object.keys(data).reduce((acc, key) => {
      const err = validateField(key, data[key]);
      if (err) acc[key] = err;
      return acc;
    }, {});

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      showSnackbar("error", "Merci de corriger les champs en erreur.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        "https://hook.eu2.make.com/w9aghbw6yfrr8im3ysq4vzf78hffiw6p",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(`Erreur serveur (${response.status})`);
      }

      showSnackbar("success", "Message envoyé avec succès ✅");
      form.current.reset();
      setErrors({});
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 6000);
    } catch (error) {
      console.error("Erreur d'envoi :", error);
      showSnackbar(
        "error",
        "Échec de l'envoi du message. Veuillez réessayer plus tard."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>Contact</Title>
        <ContactForm ref={form} onSubmit={handleSubmit} noValidate>
          <ContactTitle>Contactez-moi 🚀</ContactTitle>

          {submitted && (
            <SuccessBanner role="status" aria-live="polite">
              <SuccessIcon>✓</SuccessIcon>
              Message envoyé avec succès ! Je vous répondrai au plus vite.
            </SuccessBanner>
          )}

          <ContactInput
            placeholder="Votre Email"
            name="from_email"
            type="email"
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {errors.from_email && <ErrorText>{errors.from_email}</ErrorText>}

          <ContactInput
            placeholder="Votre Nom"
            name="from_name"
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {errors.from_name && <ErrorText>{errors.from_name}</ErrorText>}

          <ContactInput
            placeholder="Sujet"
            name="subject"
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {errors.subject && <ErrorText>{errors.subject}</ErrorText>}

          <ContactInputMessage
            placeholder="Message"
            rows="4"
            name="message"
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {errors.message && <ErrorText>{errors.message}</ErrorText>}

          <ContactButton
            type="submit"
            value={loading ? "Envoi en cours..." : "Envoyer"}
            disabled={loading}
          />
        </ContactForm>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
            severity={snackbar.severity}
            variant="filled"
            sx={{
              width: "100%",
              minWidth: "320px",
              fontSize: "16px",
              fontWeight: 600,
              alignItems: "center",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Wrapper>
    </Container>
  );
};

export default Contact;
