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
    A("mqtt", "216.218.222.55"),
    A("mqtt", "216.218.222.56"),
    A("mqtt", "216.218.222.57"),
END);
