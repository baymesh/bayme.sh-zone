var REG_NONE = NewRegistrar("none");
var DNS_CF = NewDnsProvider("cloudflare")

/* All records unproxied (no orange globe) by default. */
D("bayme.sh", REG_NONE, DnsProvider(DNS_CF),
    /* Workers custom domains (baymesh-website, baymesh-flasher). Cloudflare creates these proxied placeholder
       records itself when the Worker deploys; they are mirrored here so DNSControl doesn't delete them. */
    AAAA("@", "100::", CF_PROXY_ON),
    AAAA("www", "100::", CF_PROXY_ON),
    AAAA("flasher", "100::", CF_PROXY_ON),
    CNAME("firmware", "baymesh.github.io."),
    TXT("_dmarc", "v=DMARC1; p=none; rua=mailto:d6c2f436f2bd4bf39c06f1f3cfdb7202@dmarc-reports.cloudflare.net"),
    CNAME("meshyview", "meshyview.pages.dev."),
    TXT("@", "replit-verify=63ff4ec2-b29c-44e4-a746-52664ece449e"),
    TXT("@", "v=spf1 -all"),
    TXT("*._domainkey", "v=DKIM1; p="),
    TXT("app", "replit-verify=26fd5897-f24e-4e00-8f71-9dd3c3c0fd70"),
    TXT("_atproto", "did=did:plc:pmh7e7uvshazl4rlphmn4oyf"),
    A("app", "34.111.179.208"),
    A("data", "199.88.158.120"),
    A("mqtt", "216.218.222.55"),
    A("mqtt", "216.218.222.56"),
    A("mqtt", "216.218.222.57"),
    A("meshql", "128.199.6.235"),
    A("meshview2", "13.52.149.100"),
    A("meshview", "3.101.70.217"),
);
