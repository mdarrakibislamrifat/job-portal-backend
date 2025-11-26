const authorize = (...roles) => {
return (req, res, next) => {
if (!roles.includes(req.user.role)) {
return res.status(403).json({ message: 'Forbidden - insufficient role' });
}
// employer approval check
if (req.user.role === 'employer' && !req.user.isApproved) {
return res.status(403).json({ message: 'Your account is pending approval by the admin.' });
}
next();
};
};

export default authorize;