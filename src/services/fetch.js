const backendurl = import.meta.env.VITE_LOCAL_API_URL;

export async function POST(url, data) {
  return await fetch(backendurl + url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('transportadora_admin_auth')}`
    },
    body: JSON.stringify(data)
  });
};

export async function GET(url, data) {
  const queryString = data ? `?${new URLSearchParams(data).toString()}` : "";

  return await fetch(backendurl + url + queryString, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('transportadora_admin_auth')}`
    }
  });
};


export async function PATCH(url, data) {
  return await fetch(backendurl + url, {
    method: 'PATCH',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('transportadora_admin_auth')}`
    },
    body: JSON.stringify(data)
  });
}

export async function DELETE(url, data) {
  const objString = '?' + new URLSearchParams(data).toString();

  return await fetch(backendurl + url + objString, {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('transportadora_admin_auth')}`
    },
  });
}