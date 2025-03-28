<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Stock Panel</title>
    @viteReactRefresh
    @vite('resources/js/app.jsx')
    <meta name="csrf-token" content="{{ csrf_token() }}">
</head>
<body>
    @inertia
</body>
</html>
