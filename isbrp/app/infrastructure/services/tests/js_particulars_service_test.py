def test(test):
    assert test == "test"
    assert test != "other_than_test"
    assert type(test) == str
    assert str.lower(test) == test