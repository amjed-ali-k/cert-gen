import { FC } from "hono/jsx";

export const Layout: FC = ({ children, reciptent, issuedFor, id }) => {
  return (
    <>
      <head>
        <title>Certificate | GPTC Perinthalmanna</title>

        <meta
          name="description"
          content={`Certificate issued to ${reciptent} for ${issuedFor}`}
        />
        <meta
          name="title"
          content={`Certificate of ${reciptent} | GPTC Perinthalmanna`}
        />
        <meta name="medium" content="mult" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="robots" content="noindex,follow" />
        <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Certificate" />
        <meta
          property="og:url"
          content={`https://cert-image.amjedmgm.workers.dev/cert/${id}.image.png`}
        />
        <meta
          property="og:description"
          content={`Certificate issued to ${reciptent}  ${
            issuedFor ? `for ${issuedFor}` : ""
          }`}
        />
        <meta
          property="og:image"
          content={`https://cert-image.amjedmgm.workers.dev/cert/${id}.image.png`}
        />
        <meta
          property="og:image:secure_url"
          content={`https://cert-image.amjedmgm.workers.dev/cert/${id}.image.png`}
        />
        <meta property="og:type" content="video_lecture" />
        <meta property="og:site_name" content="GPTC Perinthalmanna" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:domain" content="www.gptcperinthalmanna.in" />
        <meta
          name="twitter:title"
          content={`Certificate of ${reciptent} | GPTC Perinthalmanna`}
        />
        <meta
          name="twitter:url"
          content={`https://cert-image.amjedmgm.workers.dev/cert/${id}.image.png`}
        />
        <meta
          name="twitter:description"
          content={`Certificate issued to ${reciptent} for ${issuedFor}`}
        />
        <meta
          name="twitter:image"
          content={`https://cert-image.amjedmgm.workers.dev/cert/${id}.image.png`}
        />
        <meta name="twitter:site" content="@gptcperinthalmanna" />

        {/* 
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/staticx/udemy/images/v7/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/staticx/udemy/images/v8/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/staticx/udemy/images/v8/favicon-16x16.png"
        />
        <link
          rel="manifest"
          href="/staticx/udemy/images/v7/site-manifest.json"
        /> */}
        <meta name="application-name" content="Cert Viewer" />

        <meta name="theme-color" content="#ffffff" />
        <link href="/static/style.css" rel="stylesheet" />
        <script src="/static/script.js"></script>
      </head>
      <body>
        <div class="min-h-dvh h-full flex flex-col text-slate-800">
          <div class=" border-b bg-slate-50 ">
            <div class="flex items-center">
              <img src="/static/logo.png" class=" h-14 m-3" />
              <div>
                <h4 class="text-2xl leading-5 font-bold">
                  Govt Polytechinic College
                </h4>
                <p class="text-lg leading-5 font-semibold text-slate-600">
                  Perinthalmanna
                </p>
              </div>
              <div class="ml-auto mr-4 font-bold text-teal-700">
                Certificate Viewer (0.3.4)
              </div>
            </div>
          </div>
          <div class="flex-1">{children}</div>
          <div class="text-center flex items-center gap-x-2 px-8 py-1 border-t leading-5 bg-slate-50 text-slate-800">
            <div class="text-lg font-bold ">Govt Polytechnic College</div>
            <div>Perinthalmanna</div>
            <a
              href="https://gptcperinthalmanna.in"
              class="cursor-pointer hover:underline hover:text-rose-500"
            >
              Visit Website
            </a>
          </div>
        </div>
      </body>
    </>
  );
};
