var REG_NONE = NewRegistrar("none");
var DNS_PB = NewDnsProvider("porkbun")

D("bayme.sh", REG_NONE, DnsProvider(DNS_PB),
    A("@", "185.199.108.153"),
    A("@", "185.199.109.153"),
    A("@", "185.199.110.153"),
    A("@", "185.199.111.153"),
    AAAA("@", "2606:50c0:8000::153"),
    AAAA("@", "2606:50c0:8001::153"),
    AAAA("@", "2606:50c0:8002::153"),
    AAAA("@", "2606:50c0:8003::153"),
    CNAME("www", "@"),
    TXT("@", "replit-verify=63ff4ec2-b29c-44e4-a746-52664ece449e"),
    TXT("app", "replit-verify=26fd5897-f24e-4e00-8f71-9dd3c3c0fd70"),
    TXT("_atproto", "did=did:plc:pmh7e7uvshazl4rlphmn4oyf"),
    A("app", "34.111.179.208"),
    A("data", "199.88.158.120"),
    A("mqtt", "216.218.222.55"),
    A("mqtt", "216.218.222.56"),
    A("mqtt", "216.218.222.57"),
    A("meshview2", "13.52.149.100"),
    A("meshview", "3.101.70.217"),
END);
