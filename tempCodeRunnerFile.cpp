#include<bits/stdc++.h>

using namespace std;
#define ll long long
#define endl "\n"
#define mod 1000000007
#define mod2 998244353
#define all all.begin(), all.end()
#define rep(a, b) for (ll i = a; i < b; i++)
    #define repeq(a, b) for (ll i = a; i <= b; i++)
        #define irep(a, b) for (ll i = a; i > b; i--)
            #define irepeq(a, b) for (ll i = a; i >= b; i--)

                // For ordered_set data structure
                #include <ext/pb_ds/assoc_container.hpp>

                #include <ext/pb_ds/tree_policy.hpp>
 // *s.find_by_order , s.order_of_key 
                // *s.find_by_order(x) -> It gives the Positon of the element we want i.e. x
                // s.order_of_key(x) -> It gives the number of elements smaller tham this element i.e. x
                typedef __gnu_pbds::tree < ll, __gnu_pbds::null_type, less < ll > , __gnu_pbds::rb_tree_tag, __gnu_pbds::tree_order_statistics_node_update > ordered_set;

// For any number n there will be exactly n^(1/3) divisors will be there

ll mul_mod(ll a, ll b, ll modulo)
{
    return ((a % modulo) * (b % modulo)) % modulo;
}

ll power(ll a, ll n, ll modulo) // Binary Exponentiation
{
    ll res = 1;
    while (n)
    {
        if (n & 1) // n is odd
        {
            n--;
            res = (((res) % modulo) * (a % modulo)) % modulo;
        }
        else
        {
            n /= 2;
            a = (((a) % modulo) * (a % modulo)) % modulo;
        }
    }
    return res;
}

// There are 9592 Prime numbers below 1e5 

// Sieve of Erastoshenes
const ll N_sieve = 1000000;
vector < ll > sieve(N_sieve, 1);

const ll spf_size = 1000001;
vector < ll > spf(spf_size, 1e9);

// Sieve of Erastoshenes is for checking whether the number is Prime or Not
void sieveoe() // If the number is marked as 1 by sieve array that indicates that the number is Prime Number 
{

    for (ll i = 0; i < spf_size; i++)
    {
        spf[i] = i;
    }

    sieve[0] = 0;
    sieve[1] = 0;
    for (ll i = 2; i * i <= N_sieve; i++) // Works in alot lesser than O(n * log (log * n))
    {
        if (sieve[i])
        {
            spf[i] = min(spf[i], i);
            for (ll j = i * i; j <= N_sieve; j += i)
            {
                sieve[j] = 0;
                spf[j] = min(spf[j], i);
            }
        }

    }
}

ll factorial(ll n)
{
    ll ans = 1;
    for (ll i = 1; i <= n; i++)
    {
        ans *= i;
    }
    return ans;
}

ll factorial_with_mod(ll n, ll modulo)
{
    ll ans = 1;
    for (ll i = 1; i <= n; i++)
    {
        ans = mul_mod(ans, i, modulo);
    }
    return ans % modulo;
}

template < class T >
    inline std::string to_string(const T & t)
    {
        std::stringstream ss;
        ss << t;
        return ss.str();
    }

bool check_prime(ll n)
{
    for (ll i = 2; i * i <= n; i++)
    {
        if (n % i == 0)
        {
            return false;
        }
    }

    return true;
}

ll divisors(ll n)
{
    ll ans = 1;
    for (ll i = 2; i * i <= n; i++)
    {
        if (n % i == 0)
        {
            ans++;
        }
        if (i != n / i) // Perfect Square Case
        {
            ans++;
        }
    }
    return ans;

}



ll inverse(ll a, ll modulo)
{
    return power(a, modulo - 2, modulo) % modulo;
}

vector < ll > fact(1e7 + 7, 0);
vector < ll > ifact(1e7 + 7, 0);
void combination(ll modulo)
{
    fact[0] = ifact[0] = 1;
    for (ll i = 1; i <= 1e7; i++)
    {
        fact[i] = mul_mod(fact[i - 1], i, modulo) % modulo;
    }
    ifact[1e7] = inverse(fact[1e7], modulo);
    for (ll i = 1e7 - 1; i >= 0; i--)
    {
        ifact[i] = mul_mod(ifact[i + 1], i + 1, modulo) % modulo;
    }
}

ll ncr(ll n, ll r, ll modulo)
{
    ll ans = (fact[n]);
    ans = mul_mod(ans, ifact[r], modulo);
    ans = mul_mod(ans, ifact[n - r], modulo);
    return ans;
}

ll ncr2(ll n, ll r) // By formula -> (n * (n-1) * (n-2) * ..... * (n-r+1)) / (1 * 2 * 3 * ...... * r)
{
    ll ans = 1;
    ll temp = n;
    while (temp >= n - r + 1)
    {
        ans *= temp;
        temp--;
    }
    ll sum = 1;
    for (ll i = 1; i <= r; i++)
    {
        sum *= i;
    }
    // cout<<ans<<" "<<sum<<endl;
    return (ans / sum);
}

ll ncr2_with_mod(ll n, ll r, ll modulo) // By formula -> (n * (n-1) * (n-2) * ..... * (n-r+1)) / (1 * 2 * 3 * ...... * r)
{
    ll ans = 1;
    ll temp = n;
    while (temp >= n - r + 1)
    {
        ans = mul_mod(ans, temp, modulo);
        temp--;
    }
    ll sum = 1;
    for (ll i = 1; i <= r; i++)
    {
        sum = mul_mod(sum, i, modulo);
    }
    // cout<<ans<<" "<<sum<<endl;
    return mul_mod(ans, inverse(sum, mod), mod);
}

ll dearrange(ll n) // By formula -> (n!) * (1 - 1/1! + 1/2! - 1/3! + 1/4! - ... +- 1/n!) 
{
    if (n == 0)
    {
        return 1;
    }
    if (n == 1)
    {
        return 0;
    }
    ll sum = 0;
    ll ans = 0;
    ll temp = (factorial(n));
    for (ll i = 2; i <= n; i++)
    {
        if (i & 1) // Minus for odd
        {
            ans += temp / (-1 * (factorial(i)));
        }
        else // Plus for even
        {
            ans += temp / ((factorial(i)));
        }
    }
    return ans;
}

void rotate(vector <ll> &ans)
{
    ll n = ans.size();
    ll temp = ans[n-1];
    for(ll i=n-1;i>=1;i--)
    {
        ans[i] = ans[i-1];
    }
    ans[0] = temp;
}

bool check(vector <ll> &ans,ll k)
{
        ll n = ans.size();
        bool minus = 1;
        for(ll i=0;i<n;i++)
        {
            if((i+1)%k == ans[i] % k)
            {
                minus = 0;
                break;
            }
        }
       return minus;
}

const ll SIZE = 3 * 1e6;
ll arr[SIZE];
ll arr2[SIZE];
int main()
{
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    cout.tie(NULL);
    ll t;
    cin >> t;
    while (t--)
    {
        ll n,k;
        cin>>n>>k;
        vector <ll> ans;
        for(ll i=1;i<=n;i++)
        {
            ans.push_back(i);
        }
        
        for(ll i=1;i<=k;i++)
        {
            // cout<<"Before : "<<i<<" -> ";
            // for(auto it : ans)
            // {
            //     cout<<it<<" ";
            // }
            rotate(ans);
            // cout<<"After : "<<i<<" -> ";
            // for(auto it : ans)
            // {
            //     cout<<it<<" ";
            // }
            // cout<<endl;
            if(check(ans,k))
            {
                // cout<<"YES"<<endl;
                break;
            }
            // else
            // {
            //     cout<<"NO"<<endl;
            // }
        }
        
            if(check(ans,k))
            {
                for(auto it : ans)
                {
                    cout<<it<<" ";
                }
                cout<<endl;
            }
            else
            {
                cout<<-1<<endl;
            }


    }
}