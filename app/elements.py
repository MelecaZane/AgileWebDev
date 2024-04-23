def head(page_title):
    return f'''
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>{page_title}</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="/static/style.css">
    <script src="https://code.jquery.com/jquery-3.7.1.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></script>
    <script src="/static/script.js"></script>
    <script src="https://kit.fontawesome.com/96ce613701.js" crossorigin="anonymous"></script>
</head>
'''

def navbar():
    return '''
<nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <a class="navbar-brand" href="/">LOGO</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item active">
                    <a class="nav-link" href="/newPost">New Post</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/howto">How-to</a>
                </li>
            </ul>
            <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                    <a class="nav-link" href="/signIn">Sign-In</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/signIn">Sign-Up</a>
                </li>
            </ul>
        </div>
    </nav>
'''

def footer():
    return '''
<footer class="bg-dark" id="footer">
            <div class="container-fluid">
                <div class="row text-center">
                    <div class="col-sm-4 footer-title text-wrap">
                        <strong>PAGES</strong>
                        <div class="footer-text">
                            <a href="#">Home</a><br>
                            <a href="#">About</a><br>
                            <a href="#">Create Post</a>
                        </div>
                    </div>
                    <div class="col-sm-4 footer-title text-wrap">
                        <strong>SOCIALS</strong>
                        <div class="footer-text">
                            <a href="#">Facebook</a><br>
                            <a href="#">Twitter</a><br>
                            <a href="#">Instagram</a><br>
                            <a href="#">Reddit</a>
                        </div>
                    </div>
                    <div class="col-sm-4 footer-title text-wrap">
                        <strong>OTHER</strong>
                        <div class="footer-text">
                            <a href="#">XYZ</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
'''