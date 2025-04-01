@extends('layouts.app')

@section('content')
    <h1>Menus</h1>
    <a href="{{ route('menus.create') }}">Create Menu</a>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>URL</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($menus as $menu)
                <tr>
                    <td>{{ $menu->id }}</td>
                    <td>{{ $menu->name }}</td>
                    <td>{{ $menu->url }}</td>
                    <td>{{ $menu->status ? 'Active' : 'Inactive' }}</td>
                    <td>
                        <a href="{{ route('menus.edit', $menu) }}">Edit</a>
                        <form action="{{ route('menus.destroy', $menu) }}" method="POST" style="display:inline;">
                            @csrf
                            @method('DELETE')
                            <button type="submit">Delete</button>
                        </form>
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
@endsection
