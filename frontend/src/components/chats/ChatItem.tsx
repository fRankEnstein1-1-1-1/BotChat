import ReactMarkdown from "react-markdown";
import { Box, Avatar } from "@mui/material";
import { useAuth } from "../../context/AuthContext";

export const ChatItem = ({ content, role }: { content: string; role: "user" | "assistant" }) => {
  const auth = useAuth();
  const initials = (() => {
    const name = auth?.user?.name || "";
    const parts = name.trim().split(" ");
    return (parts[0]?.[0] || "") + (parts[1]?.[0] || "");
  })();

  const isAssistant = role === "assistant";

  return (
    <Box sx={{ display: "flex", flexDirection: isAssistant ? "row" : "row-reverse", alignItems: "flex-start", gap: 2, px: 2 }}>
      <Avatar>{isAssistant ? "AI" : initials}</Avatar>

      <Box
        sx={{
          backgroundColor: isAssistant ? "#f0f0f0" : "#1976d2",
          color: isAssistant ? "black" : "white",
          p: 2,
          borderRadius: 2,
          maxWidth: "90%",
          wordBreak: "break-word",
          overflowWrap: "break-word",
          fontFamily: "Work Sans, sans-serif",
          whiteSpace: "pre-wrap",
        }}
      >
        <ReactMarkdown
          components={{
            code({ children }) {
              return (
                <Box
                  component="code"
                  sx={{
                    display: "block",
                    bgcolor: "#121212",
                    color: "#e0e0e0",
                    p: 1,
                    borderRadius: 1,
                    overflowX: "auto",
                    fontSize: "14px",
                    fontFamily: "monospace",
                    my: 1,
                    whiteSpace: "pre-wrap",
                    maxWidth: "100%",
                  }}
                >
                  {children}
                </Box>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </Box>
    </Box>
  );
};
