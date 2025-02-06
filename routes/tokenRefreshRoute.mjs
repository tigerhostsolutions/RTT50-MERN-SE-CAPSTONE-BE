import express from 'express';
const router = express.Router;

router.post("/refresh-token", (req, res) => {
  const refreshToken = req.cookies.refreshToken; // Sent in an HTTP-only cookie

  if (!refreshToken) {
    return res.status(401).send({ error: "Refresh token is missing" });
  }

  // Verify the refresh token
  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
    if (err) return res.status(403).send({ error: "Invalid refresh token" });

    // Generate a new access token
    const newAccessToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    return res.status(200).send({ accessToken: newAccessToken });
  });
});