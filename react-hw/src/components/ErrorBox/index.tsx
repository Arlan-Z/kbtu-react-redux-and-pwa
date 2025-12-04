interface Props {
  message: string;
}

export default function ErrorBox({ message }: Props) {
  return (
    <div style={{ color: "red", textAlign: "center", marginTop: "20px" }}>
      {message}
    </div>
  );
}
