#include<bits/stdc++.h>
using namespace std;
#define ll long long


int main()
{
     ll t;
     cin>>t;
     while(t--)
     {
        ll n,k;
        cin>>n>>k;
        ll arr[n],arr2[n];
        for(ll i=0;i<n;i++)
        {
            cin>>arr[i];
        }

        for(ll i=0;i<n;i++)
        {
            cin>>arr2[i];
        }

        map <ll,ll> buys,neg_review;
        set <ll> st;
        for(ll i=0;i<n;i++)
        {
            st.insert(arr[i]);
            st.insert(arr2[i]);
            buys[arr2[i]]--;
            neg_review[arr[i]]++;
            neg_review[arr2[i]]--;
        }

        // cout<<"Buy : "<<endl;
        // for(auto it : buy)
        // {
        //     cout<<it.first<<" "<<it.second<<endl;
        // }

        // cout<<"Review : "<<endl;
        // for(auto it : neg_review)
        // {
        //     cout<<it.first<<" "<<it.second<<endl;
        // }

        ll ans = 0;
        ll total_neg_review = 0;
        ll total_buys = n;
        for(auto it : buys)
        {
            if(total_neg_review <= k)
            {
                ll temp = total_buys * it.first;
                ans = max(ans,temp);
            }
            total_buys += buys[it.first];
            total_neg_review += neg_review[it.first];
        }
        // for(auto it : st)
        // {
        //     if(total_neg_review <= k)
        //     {
        //         ll temp = total_buys * it;
        //         ans = max(ans,temp);
        //     }
        //     total_buys += buys[it];
        //     total_neg_review += neg_review[it];
        // }

        cout<<ans<<endl;
     }

}